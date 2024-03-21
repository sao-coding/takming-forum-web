import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const teacherId = req.nextUrl.searchParams.get("teacher")
  const courseId = req.nextUrl.searchParams.get("course")
  const search = req.nextUrl.searchParams.get("search") || ""

  // 獲取該教師的所有課程資訊
  // 獲取課程評分array 做平均
  // 獲取評論數量
  if (teacherId) {
    const courses = await prisma.course.findMany({
      where: {
        teacherId
      },
      include: {
        Review: {
          select: {
            rating: true
          }
        }
      },
      orderBy: {
        updatedAt: "desc"
      }
    })

    const coursesInfo = courses.map((course) => {
      const ratingLength = course.Review.length
      const totalRating = course.Review.reduce((acc, cur) => acc + cur.rating, 0)
      return {
        id: course.id,
        name: course.name,
        teacherId: course.teacherId,
        totalRating: ratingLength,
        averageRating: ratingLength === 0 ? 0 : (totalRating / ratingLength).toFixed(1)
      }
    })

    // return res.json({
    //   msg: "獲取課程資訊成功",
    //   courses: coursesInfo
    // })
    return NextResponse.json({
      msg: "獲取課程資訊成功",
      courses: coursesInfo
    })
  }

  if (courseId) {
    // 獲取老師名字
    // 獲取課程評分array 做平均
    const course = await prisma.course.findUnique({
      where: {
        id: courseId
      },
      include: {
        teacher: {
          select: {
            name: true
          }
        },
        Review: {
          select: {
            rating: true
          }
        }
      }
    })

    const ratingLength = course?.Review.length || 0

    const totalRating = course?.Review.reduce((acc, cur) => acc + cur.rating, 0) || 0

    // return res.json({
    //   msg: "獲取課程資訊成功",
    //   course: {
    //     id: course?.id,
    //     name: course?.name,
    //     teacherId: course?.teacherId,
    //     teacher: {
    //       name: course?.teacher.name
    //     },
    //     // 取到小數點第一位: course?.averageRating,
    //     averageRating: ratingLength === 0 ? 0 : (totalRating / ratingLength).toFixed(1)
    //   }
    // })

    return NextResponse.json({
      msg: "獲取課程資訊成功",
      course: {
        id: course?.id,
        name: course?.name,
        teacherId: course?.teacherId,
        teacher: {
          name: course?.teacher.name
        },
        averageRating: ratingLength === 0 ? 0 : (totalRating / ratingLength).toFixed(1)
      }
    })
  }

  // 獲取所有課程資訊
  const courses = await prisma.course.findMany({
    where: {
      name: {
        contains: search
      }
    },
    include: {
      teacher: {
        select: {
          name: true
        }
      },
      Review: {
        select: {
          rating: true
        }
      }
    },
    orderBy: {
      updatedAt: "desc"
    }
  })

  const coursesInfo = courses.map((course) => {
    const ratingLength = course.Review.length
    const totalRating = course.Review.reduce((acc, cur) => acc + cur.rating, 0)
    return {
      id: course.id,
      name: course.name,
      teacherId: course.teacherId,
      teacher: {
        name: course.teacher.name
      },
      totalRating: ratingLength,
      averageRating: ratingLength === 0 ? 0 : (totalRating / ratingLength).toFixed(1)
    }
  })

  //   res.json({
  //     msg: "獲取課程資訊成功",
  //     courses: coursesInfo
  //   })

  return NextResponse.json({
    msg: "獲取課程資訊成功",
    courses: coursesInfo
  })
}

export const POST = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  // 若不是 學號 D11019139 的使用者，則回傳 403 Forbidden
  const role = auth.role
  if (role === "USER") {
    // return res.status(403).json({ msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 403 })
  }
  const course = await req.json()
  if (!course.name || !course.teacherId) {
    // return res.status(400).json({ msg: "請填寫課名稱" })
    return NextResponse.json({ msg: "請填寫課名稱" }, { status: 400 })
  }
  const newCourse = await prisma.course.create({
    data: course
  })

  // res.json({ msg: "新增課程資訊成功", course: newCourse })
  return NextResponse.json({ msg: "新增課程資訊成功", course: newCourse })
}
