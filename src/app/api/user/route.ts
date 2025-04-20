import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const auth = await getCurrentUser()
  if (type === "settings") {
    // 若有 LineNotifyToken 則回傳 true 否則回傳 false
    const contact = await prisma.userSettings.findUnique({
      where: { userId: auth.id }
    })

    const contactInfo = {
      username: contact?.username,
      email: contact?.email,
      phone: contact?.phone,
      lineId: contact?.lineId,
      igId: contact?.igId
    }

    // res.json({ status: 200, msg: "獲取使用者聯絡方式成功", contact: contactInfo })
    return NextResponse.json({ msg: "獲取使用者聯絡方式成功", contact: contactInfo })
  }

  if (type === "count") {
    //  使用者註冊人數 回傳 今天註冊人數、總註冊人數
    const today = new Date()
    // 00:00:00 -> 24:00:00
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const todayEnd = new Date(todayStart)
    todayEnd.setDate(todayEnd.getDate() + 1)
    const total = await prisma.user.count()
    const todayCount = await prisma.user.count({
      where: {
        createdAt: {
          gte: todayStart,
          lt: todayEnd
        }
      }
    })

    return NextResponse.json({ msg: "獲取使用者註冊人數成功", today: todayCount, total })
  }
}

export const POST = async (req: NextRequest) => {
  return NextResponse.json({ msg: "POST" })
}

export const PUT = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const auth = await getCurrentUser()
  if (type === "settings") {
    const { username, email, phone, lineId, igId } = await req.json()

    // username 不能在現有的使用者中重複 但是 "匿名" 可以重複
    if (username !== "匿名") {
      const user = await prisma.userSettings.findFirst({
        where: {
          username: {
            equals: username
          },
          userId: { not: auth.id }
        },
        select: { username: true }
      })
      if (user) {
        return NextResponse.json({ msg: "使用者名稱已存在" }, { status: 400 })
      }
    }

    let contact

    try {
      contact = await prisma.userSettings.update({
        where: { userId: auth.id },
        data: {
          username,
          email,
          phone,
          lineId,
          igId
        }
      })
    } catch (error) {
      return NextResponse.json({ msg: "更新使用者聯絡方式失敗" }, { status: 400 })
    }
    return NextResponse.json({ msg: "更新使用者聯絡方式成功", contact })
  }
}
