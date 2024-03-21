import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const auth = await getCurrentUser()
  if (type === "settings") {
    // 若有 LineNotifyToken 則回傳 true 否則回傳 false
    const contact = await prisma.userSetting.findUnique({
      where: { userId: auth.id }
    })

    const contactInfo = {
      lineNotifyStatus: contact?.lineNotifyStatus,
      lineNotifyToken: contact?.lineNotifyToken ? true : false,
      username: contact?.username,
      email: contact?.email,
      phone: contact?.phone,
      lineId: contact?.lineId,
      igId: contact?.igId
    }

    // res.json({ status: 200, msg: "獲取使用者聯絡方式成功", contact: contactInfo })
    return NextResponse.json({ msg: "獲取使用者聯絡方式成功", contact: contactInfo })
  }
}

export const POST = async (req: NextRequest) => {
  return NextResponse.json({ msg: "POST" })
}

export const PUT = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const auth = await getCurrentUser()
  if (type === "settings") {
    const { lineNotifyStatus, username, email, phone, lineId, igId } = await req.json()
    const contact = await prisma.userSetting.update({
      where: { userId: auth.id },
      data: {
        lineNotifyStatus,
        username,
        email,
        phone,
        lineId,
        igId
      }
    })
    return NextResponse.json({ msg: "更新使用者聯絡方式成功", contact })
  }
}
