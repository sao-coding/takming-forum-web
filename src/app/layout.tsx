import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Toaster } from "sonner"

import { site } from "@/config/site"
import authOptions from "@/lib/auth"
import { prisma } from "@/lib/prisma"

import Providers from "./providers"
import UmamiAnalytics from "./UmamiAnalytics"

import "./globals.css"

const getKeywords = () => {
  // 匯出所有老師的名字 + 所有課程的名字
  // 這樣可以讓搜尋引擎更容易找到我們的網站

  const teachers = prisma.teacher.findMany({
    select: {
      name: true
    }
  })

  const courses = prisma.course.findMany({
    select: {
      name: true
    }
  })

  return Promise.all([teachers, courses]).then(([teachers, courses]) => {
    const siteKeywords = site.keywords.split(", ")

    return [
      ...siteKeywords,
      ...teachers.map((teacher) => teacher.name),
      ...courses.map((course) => course.name)
    ].join(", ")
  })
}

export async function generateMetadata(): Promise<Metadata> {
  const keywords = await getKeywords()

  return {
    title: "德明論壇",
    description: "一個讓你發表意見，評論課程，賣二手書的地方",
    keywords
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang='zh-Hant-TW'>
      <head>
        <UmamiAnalytics />
      </head>
      <body className='bg-slate-50'>
        <Providers session={session}>{children}</Providers>
        <Toaster
          richColors
          closeButton
          position='top-center'
          toastOptions={{
            classNames: {
              toast: "backdrop-blur-none"
            }
          }}
        />
      </body>
    </html>
  )
}
