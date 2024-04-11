import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"
import { Log } from "@prisma/client"
import pathnameToTitle from "@/utils/pathname-to-title"

export const GET = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  const page = Number(req.nextUrl.searchParams.get("page")) || 1
  const perPage = Number(req.nextUrl.searchParams.get("perPage")) || 5

  const skip = (page - 1) * perPage
  const take = perPage
  if (auth.role !== "USER") {
    const logs = await prisma.log.findMany({
      skip,
      take,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            studentId: true,
            name: true,
            picture: true,
            UserSettings: {
              select: {
                username: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({ msg: "獲取 log 成功", logs })
  } else {
    return NextResponse.json({ msg: "權限不足" })
  }
}

export const POST = async (req: NextRequest) => {
  const res: Log = await req.json()
  const user = await getCurrentUser()
  console.log("title pathname", await pathnameToTitle(res.pathname))
  // if (process.env.NODE_ENV === "production" && user.role !== "SUPER_ADMIN") {
  await prisma.log.create({
    data: {
      ip: res.ip,
      user: {
        connect: {
          id: user.id
        }
      },
      title: await pathnameToTitle(res.pathname),
      pathname: res.pathname,
      // 把 json [{ key, value }] 轉成 字串
      searchParams: JSON.stringify(res.searchParams)
    }
  })
  // }

  return NextResponse.json({ msg: "新增 log 成功" })
}
