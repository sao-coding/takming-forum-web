import { prisma } from "@/lib/prisma"

const pathnameToTitle = async (pathname: string) => {
  let title

  if (pathname.startsWith("/teacher")) {
    if (pathname.split("/").length === 3) {
      console.log("pathname3", pathname.split("/")[2])
      title = await prisma.teacher.findUnique({
        where: { id: pathname.split("/")[2] }
      })
      title = title?.name
    } else if (pathname.split("/").length === 4) {
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
