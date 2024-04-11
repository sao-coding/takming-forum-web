import { prisma } from "@/lib/prisma"

const pathnameToTitle = async (pathname: string) => {
  let title

  if (pathname.startsWith("/teacher") && title === undefined) {
    if (pathname.split("/").length === 3) {
      console.log("pathname3", pathname)
      title = await prisma.teacher.findUnique({
        where: { id: pathname.split("/")[2] }
      })
      title = title?.name
    } else {
      console.log("pathname4", pathname.split("/")[4])
      title = await prisma.course.findUnique({
        where: { id: pathname.split("/")[4] }
      })
      title = title?.name
    }
  }

  return title
}

export default pathnameToTitle
