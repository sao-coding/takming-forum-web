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
  const user = await getCurrentUser()
  const { message } = await req.json()

  const lineNotifySetting = await prisma.userSettings.findFirst({
    where: { userId: user.id }
  })
  if (!lineNotifySetting?.lineNotifyStatus || lineNotifySetting.lineNotifyToken === null) {
    // return res.status(400).json({ msg: "Line Notify 未綁定" })
    return NextResponse.json({ msg: "Line Notify 未綁定" }, { status: 400 })
  }

  const response = await fetch("https://notify-api.line.me/api/notify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${lineNotifySetting.lineNotifyToken}`
    },
    body: new URLSearchParams({ message })
  })
  const data = await response.json()

  if (response.ok) {
    // res.json({ msg: "傳送訊息成功" })
    return NextResponse.json({ msg: "傳送訊息成功" })
  } else {
    // res.status(400).json({ msg: `傳送訊息失敗: ${data.message}` })
    return NextResponse.json({ msg: `傳送訊息失敗: ${data.message}` }, { status: 400 })
  }
}
