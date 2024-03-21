import { Metadata } from "next"

import { prisma } from "@/lib/prisma"

export async function generateMetadata({
  params
}: {
  params: { courseId: string }
}): Promise<Metadata> {
  const courseId = params.courseId

  const course = await prisma.course.findUnique({
    where: {
      id: courseId
    },
    select: {
      name: true,
      teacher: {
        select: {
          name: true
        }
      }
    }
  })

  return {
    title: `${course?.teacher.name} - ${course?.name}`,
    description: `${course?.teacher.name}教師的課程`,
    keywords: [course?.teacher.name || "", course?.name || ""]
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
