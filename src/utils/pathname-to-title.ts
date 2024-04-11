import { prisma } from "@/lib/prisma"

const pathnameToTitle = async (pathname: string) => {
  let title

  if (pathname.startsWith("/teacher") && title === undefined) {
    if (pathname.split("/").length === 3) {
      title = await prisma.teacher.findUnique({
        where: { id: pathname.split("/")[2] }
      })
      title = title?.name
    } else {
      title = await prisma.course.findUnique({
        where: { id: pathname.split("/")[4] }
      })
      title = title?.name
    }
  }

  return title
}

export default pathnameToTitle
