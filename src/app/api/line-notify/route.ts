import { NextRequest, NextResponse } from "next/server"

import { site } from "@/config/site"
import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id")
  //   const code = req.query.code
  //   const state = req.query.state
  //   const error = req.query.error
  //   const errorDescription = req.query.error_description
  const code = req.nextUrl.searchParams.get("code")
  const state = req.nextUrl.searchParams.get("state")

  if (!code || !state) {
    // return res.status(400).json({ msg: "Line Notify 綁定失敗" })
    return NextResponse.json({ msg: "Line Notify 綁定失敗" }, { status: 400 })
  }
  console.log("code", code)
  const response = await fetch("https://notify-bot.line.me/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: process.env.LINE_NOTIFY_CALLBACK_URL as string,
      client_id: process.env.LINE_NOTIFY_CLIENT_ID as string,
      client_secret: process.env.LINE_NOTIFY_CLIENT_SECRET as string
    })
  })
  const data = await response.json()

  // 設定 Line Notify token
  const user = await getCurrentUser()
  const token = data.access_token
  console.log("user", user.id)
  console.log("lineNotifyToken", token)
  if (!token) {
    // return res.status(400).json({ msg: "Line Notify 綁定失敗" })
    // return NextResponse.json({ msg: "Line Notify 綁定失敗" }, { status: 400 })
    return NextResponse.redirect(`${site.url}/line-notify?status=error&msg=Line Notify 綁定失敗`)
  }
  try {
    // 更新使用者的 Line Notify token
    await prisma.userSettings.update({
      where: { userId: user.id },
      data: {
        lineNotifyToken: token,
        lineNotifyStatus: true
      }
    })
  } catch (error) {
    console.log("error", error)
    // res.status(400).json({ msg: "Line Notify 綁定失敗" })
    // return NextResponse.json({ msg: "Line Notify 綁定失敗" }, { status: 400 })
    return NextResponse.redirect(`${site.url}/line-notify?status=error&msg=Line Notify 綁定失敗`)
  }
  //   res.json({ msg: "Line Notify 綁定成功" })
  //   跳回原本的頁面
  //   callbackUrl=

  return NextResponse.redirect(`${site.url}/line-notify?status=success&msg=Line Notify 綁定成功`)
}

export const POST = async (req: NextRequest) => {
  const { userId, postId } = await req.json()

  const user = await getCurrentUser()

  // 賣家的 token
  const sendUser = await prisma.userSettings.findFirst({
    where: { userId }
  })

  // 買家的聯絡方式
  const lineNotifySetting = await prisma.userSettings.findFirst({
    where: { userId: user.id }
  })

  const email = lineNotifySetting?.email || "未填寫"
  const phone = lineNotifySetting?.phone || "未填寫"
  const lineId = lineNotifySetting?.lineId || "未填寫"
  const igId = lineNotifySetting?.igId || "未填寫"

  const message = `二手書\n我想購買你的書\n${site.url}${"/book/posts/"}${postId}\n我的聯絡方式是：\nEmail:\n${email}\n電話:\n${phone}\nLine:\n${lineId}\nIG:\n${igId}`

  const response = await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${sendUser?.lineNotifyToken}`
    },
    body: new URLSearchParams({ message })
  })
  const data = await response.json()
  console.log("data", data)
  if (response.ok) {
    // res.json({ msg: "傳送訊息成功" })
    // 迴圈 lineNotifySetting 的所有聯絡方式，如果只有email就提醒使用者
    let len = 0
    if (lineNotifySetting?.email) len++
    if (lineNotifySetting?.phone) len++
    if (lineNotifySetting?.lineId) len++
    if (lineNotifySetting?.igId) len++

    if (len === 1 && lineNotifySetting?.email) {
      return NextResponse.json({ msg: "您只填寫了 Email 聯絡方式" })
    }

    return NextResponse.json({ msg: "傳送訊息成功" })
  } else {
    // res.status(400).json({ msg: `傳送訊息失敗: ${data.message}` })
    return NextResponse.json({ msg: `傳送訊息失敗: ${data.message}` }, { status: 400 })
  }
}
