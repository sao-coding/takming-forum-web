import { Metadata } from "next"
import { headers } from "next/headers"

import { prisma } from "@/lib/prisma"
export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const header_url = decodeURIComponent(headersList.get("x-url") || "")
  const callbackUrl = header_url.split("?")[1] || ""

  // 若 callbackUrl 含有 teacher id 和 course id，則取出 teacher id 和 course id
  if (callbackUrl.includes("teacher") && callbackUrl.includes("course")) {
    // http://localhost:3000/sign-in?callbackUrl=%2Fteacher%2Fclteiguvj004d11q2ddig5l1e%2Fcourse%2Fclu188e8o000pntcvtoqxu5qs

    // 取出 teacher id 和 course id

    const teacher_id = callbackUrl.split("/")[2]
    const course_id = callbackUrl.split("/")[4]

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacher_id
      },
      select: {
        name: true
      }
    })

    const course = await prisma.course.findUnique({
      where: {
        id: course_id
      },
      select: {
        name: true
      }
    })

    return {
      title: `${teacher?.name} - ${course?.name}課程 - 登入`,
      description: `登入以繼續訪問 ${teacher?.name}教師的${course?.name}課程`
    }
  } else if (callbackUrl.includes("teacher") && callbackUrl.split("/").length === 3) {
    // 若 callbackUrl 含有 teacher id，則取出 teacher id
    const teacher_id = callbackUrl.split("/")[2]

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacher_id
      },
      select: {
        name: true
      }
    })

    return {
      title: `${teacher?.name}教師 - 登入`,
      description: `登入以繼續訪問 ${teacher?.name}教師的課程`
    }
  } else if (callbackUrl.includes("book/posts") && callbackUrl.split("/").length === 4) {
    // 若 callbackUrl 含有 book id，則取出 book id
    const book_id = callbackUrl.split("/")[3]

    const book = await prisma.book.findUnique({
      where: {
        id: book_id
      },
      select: {
        title: true,
        cover: true
      }
    })
    return {
      title: `二手書 ${book?.title} - 登入`,
      description: `登入以繼續訪問 ${book?.title}二手書籍`,
      twitter: {
        title: `二手書 ${book?.title} - 登入`,
        description: `登入以繼續訪問 ${book?.title}二手書籍`,
        card: "summary",
        images: `${book?.cover}`
      },
      openGraph: {
        title: `二手書 ${book?.title} - 登入`,
        description: `登入以繼續訪問 ${book?.title}二手書籍`,
        images: `${book?.cover}`
      }
    }
  } else {
    return {
      title: "登入",
      description: "登入到德明論壇"
    }
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
