import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const search = req.nextUrl.searchParams.get("search") || ""
  const id = req.nextUrl.searchParams.get("id")
  //   const page = Number(req.query.page) || 1
  //   const perPage = Number(req.query.perPage) || 10
  //   const skip = (page - 1) * perPage
  //   const take = perPage
  // 分頁
  // 模糊搜尋
  // 獲取所有老師資訊
  const teachersCount = await prisma.teacher.count()
  // const teachers = await prisma.teacher.findMany({
  //   // skip,
  //   // take,
  //   orderBy: {
  //     createdAt: "desc"
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     picture: true
  //   }
  // })
  const teachers = await prisma.teacher.findMany({
    where: {
      name: {
        contains: search
      }
    },
    orderBy: {
      updatedAt: "desc"
    },
    select: {
      id: true,
      name: true,
      picture: true
    }
  })

  if (id) {
    // 獲取老師的所有課程資訊
    const teacher = await prisma.teacher.findUnique({
      where: {
        id
      },
      include: {
        Course: {
          include: {
            Review: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    })

    const coursesInfo = teacher?.Course.map((course) => {
      const ratingLength = course.Review.length
      const totalRating = course.Review.reduce((acc, cur) => acc + cur.rating, 0)
      return {
        totalRating: ratingLength,
        averageRating: ratingLength === 0 ? 0 : (totalRating / ratingLength).toFixed(1)
      }
    })

    let teacherTotalRating = 0
    let teacherAverageRating: string | number = 0

    if (coursesInfo) {
      teacherTotalRating = coursesInfo.length
      teacherAverageRating =
        teacherTotalRating === 0
          ? 0
          : (
              coursesInfo?.reduce((acc, cur) => acc + Number(cur.averageRating), 0) /
              teacherTotalRating
            ).toFixed(1)
    }

    if (!teacher) {
      // return res.status(404).json({ msg: "找不到老師" })
      return NextResponse.json({ msg: "找不到老師" }, { status: 404 })
    }

    // res.json({
    //   msg: "獲取老師資訊成功",
    //   teacher: {
    //     id: teacher?.id,
    //     name: teacher?.name,
    //     picture: teacher?.picture,
    //     email: teacher?.email,
    //     education: teacher?.education,
    //     expertise: teacher?.expertise,
    //     totalRating:
    //       coursesInfo?.map((course) => course.totalRating).reduce((acc, cur) => acc + cur, 0) || 0,
    //     averageRating: teacherAverageRating
    //   }
    // })
    return NextResponse.json({
      msg: "獲取老師資訊成功",
      teacher: {
        id: teacher?.id,
        name: teacher?.name,
        picture: teacher?.picture,
        email: teacher?.email,
        education: teacher?.education,
        expertise: teacher?.expertise,
        totalRating:
          coursesInfo?.map((course) => course.totalRating).reduce((acc, cur) => acc + cur, 0) || 0,
        averageRating: teacherAverageRating
      }
    })
  }

  //   res.status(200).json({ msg: "獲取老師資訊成功", teachers, count: teachersCount })
  return NextResponse.json({ msg: "獲取老師資訊成功", teachers, count: teachersCount })
}

export const POST = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  // 若不是 學號 D11019139 的使用者，則回傳 403 Forbidden
  const role = auth.role
  if (role === "USER") {
    // return res.status(403).json({ status: 403, msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 403 })
  }
  const teacher = await req.json()
  const newTeacher = await prisma.teacher.create({
    data: teacher
  })

  // res.status(200).json({ msg: "新增老師資訊成功", teacher: newTeacher })
  return NextResponse.json({ msg: "新增老師資訊成功", teacher: newTeacher })
}

export const PATCH = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  // 若不是 學號 D11019139 的使用者，則回傳 403 Forbidden
  const role = auth.role
  if (role === "USER") {
    // return res.status(403).json({ status: 403, msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 403 })
  }
  const teacher = await req.json()

  const findTeacherId = await prisma.teacher.findUnique({
    where: {
      id: teacher.id
    },
    select: {
      teacherId: true
    }
  })

  const updatedTeacher = await prisma.teacher.update({
    where: {
      id: teacher.id
    },
    data: {
      teacherId: findTeacherId?.teacherId,
      ...teacher
    }
  })

  // res.status(200).json({ msg: "更新老師資訊成功", teacher: updatedTeacher })
  return NextResponse.json({ msg: "更新老師資訊成功", teacher: updatedTeacher })
}
