import { NextRequest, NextResponse } from "next/server"

import BookPurchaseRequest from "@/email/book"
import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"
import resend from "@/lib/resend"
import { BookPost } from "@/types"
import { render } from "@react-email/components"

// 擴展 BookPost 型別，覆寫 content 屬性
type ApiBookPost = Omit<BookPost, "content"> & {
  content: string // 這裡可以改為您需要的型別
}

export const POST = async (req: NextRequest) => {
  const body: ApiBookPost = await req.json()
  const user = await getCurrentUser()

  // 尋長賣家email
  const seller = await prisma.user.findUnique({
    where: { id: body.userId },
    select: {
      email: true
    }
  })

  const userSettings = await prisma.userSettings.findUnique({
    where: { userId: user.id }
  })

  const emailHtml = await render(
    <BookPurchaseRequest
      buyer={{
        name: user.name || "匿名",
        image: user.picture,
        email: user.email,
        phone: userSettings?.phone || "未填寫",
        lineId: userSettings?.lineId || "未填寫",
        igId: userSettings?.igId || "未填寫"
      }}
      date={new Date().toLocaleString("zh-TW", {
        timeZone: "Asia/Taipei",
        hour12: false
      })}
      id={body.id}
      book={{
        title: body.title,
        price: `NT$${body.price}`,
        image: body.cover || "",
        condition: body.content
      }}
    />
  )
  const options = {
    from: "noreply@sao-x.com",
    to: seller?.email,
    subject: `二手書 - ${body.title} 購買請求`,
    html: emailHtml
  }
  const response = await resend.sendMail(options)
  console.log("response", response)
  // 包含 "OK" 的回應
  if (response.response.includes("OK")) {
    let len = 0
    if (userSettings?.email) len++
    if (userSettings?.phone) len++
    if (userSettings?.lineId) len++
    if (userSettings?.igId) len++
    if (len === 1 && userSettings?.email) {
      return NextResponse.json({ msg: "您只填寫了 Email 聯絡方式" })
    }
    // 更新聯絡次數 +1
    await prisma.book.update({
      where: { id: body.id },
      data: {
        contactCount: {
          increment: 1
        }
      }
    })
    return NextResponse.json({
      status: "success",
      msg: "傳送訊息成功",
      data: response
    })
  } else {
    return NextResponse.json({ msg: `傳送訊息失敗: ${response.response}` }, { status: 400 })
  }
}
