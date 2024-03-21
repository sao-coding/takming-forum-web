import { Metadata } from "next"

import { site } from "@/config/site"
import { prisma } from "@/lib/prisma"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id

  const teacher = await prisma.teacher.findUnique({
    where: {
      id
    },
    select: {
      name: true
    }
  })

  // 此教師的課程

  const courses = await prisma.course.findMany({
    where: {
      teacherId: id
    },
    select: {
      name: true
    }
  })

  return {
    title: `${teacher?.name}教師`,
    description: `${teacher?.name}教師的課程`,
    keywords: [site.keywords, teacher?.name || "", ...courses.map((course) => course.name)]
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
