import { Metadata } from "next"

import { site } from "@/config/site"
import { prisma } from "@/lib/prisma"
import { JSONContent } from "@tiptap/react"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id

  const post = await prisma.book.findUnique({
    where: { id }
    // include: { user: true }
  })

  // 把 content 裡的 text 取出來合併成一個 string
  const content = post?.content as JSONContent
  const text = content?.content?.map((item) => item?.content && item.content[0]?.text).join("")

  return {
    title: `${post?.title} | 二手書 | 德明論壇`,
    description: text?.slice(0, 100) + "...",
    keywords: `${site.keywords}, ${post?.title}`
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
