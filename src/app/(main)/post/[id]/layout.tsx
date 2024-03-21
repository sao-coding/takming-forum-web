import { Metadata } from "next"

import { site } from "@/config/site"
import { prisma } from "@/lib/prisma"
import { JSONContent } from "@tiptap/react"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id

  const post = await prisma.post.findUnique({
    where: { id }
    // include: { user: true }
  })

  // 把 content 裡的 text 取出來合併成一個 string
  const content = post?.content as JSONContent
  const text = content?.content?.map((item) => item?.content && item.content[0]?.text).join("")

  return {
    title: `${post?.title} | 文章 | 德明論壇`,
    description: text?.slice(0, 100) + "...",
    keywords: `${site.keywords}, ${post?.title}`
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: {
      title: true
    }
  })

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首頁",
        item: "https://takming-forum.sao-x.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "文章",
        item: "https://takming-forum.sao-x.com/post"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post?.title,
        item: `https://takming-forum.sao-x.com/post/${params.id}`
      }
    ]
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
