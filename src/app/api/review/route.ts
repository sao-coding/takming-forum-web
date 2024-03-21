import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

// 顯示評論
export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const courseId = req.nextUrl.searchParams.get("course") || ""

  if (type === "count") {
    const auth = await getCurrentUser()
    console.log("auth", auth.id)
    const reviewsCount = await prisma.review.count({
      where: {
        userId: auth.id
      }
    })

    return NextResponse.json({ msg: "獲取評論數量成功", count: reviewsCount })
  }

  if (type === "rank") {
    // 排名使用者評論的課程數量
    const rank = await prisma.review.groupBy({
      by: ["userId"],
      _count: {
        courseId: true
      },
      orderBy: {
        _count: {
          courseId: "desc"
        }
      }
    })

    // console.log("rank", rank)

    const rankWithUsername = await Promise.all(
      rank.map(async (user) => {
        const username = await prisma.userSetting.findUnique({
          where: {
            userId: user.userId
          },
          select: {
            username: true
          }
        })
        return {
          username: username?.username,
          // rank: rank.indexOf(user) + 1,
          // 若 留言數量跟上一個一樣，排名就一樣名次
          rank: rank.findIndex((item) => item._count.courseId === user._count.courseId) + 1,
          count: user._count.courseId
        }
      })
    )

    return NextResponse.json({ msg: "獲取評論排名成功", rank: rankWithUsername })
  }

  const comments = await prisma.review.findMany({
    where: {
      courseId
    },
    orderBy: {
      updatedAt: "desc"
    },
    // 獲取username
    include: {
      user: {
        select: {
          UserSetting: {
            select: {
              username: true
            }
          }
        }
      }
    }
  })

  const commentsWithUsername = comments.map((comment) => {
    return {
      id: comment.id,
      courseId: comment.courseId,
      userId: comment.userId,
      username: comment.user.UserSetting.map((setting) => setting.username)[0],
      rating: comment.rating,
      comment: comment.comment,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt
    }
  })

  //   res.json({ msg: "獲取評論成功", comments: commentsWithUsername })
  return NextResponse.json({ msg: "獲取評論成功", comments: commentsWithUsername })
}

// 新增評論 使用者若評論過就不能再評論
export const POST = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  const { courseId, rating, comment } = await req.json()
  // 判斷這個使否已經在此課程中評論過
  const hasCommented = await prisma.review.findFirst({
    where: {
      courseId,
      userId: auth.id
    },
    select: {
      id: true
    }
  })

  if (hasCommented) {
    //   return res.status(400).json({ msg: "已經評論過" })
    return NextResponse.json({ msg: "已綍評論過" })
  }

  const newComment = await prisma.review.create({
    data: {
      courseId,
      rating,
      comment,
      userId: auth.id
    }
  })

  // 把課程的 updateAt 更新
  await prisma.course.update({
    where: {
      id: courseId
    },
    data: {
      updatedAt: new Date()
    }
  })

  // 把老師的 updateAt 更新
  const teacherId = await prisma.course.findUnique({
    where: {
      id: courseId
    },
    select: {
      teacherId: true
    }
  })

  await prisma.teacher.update({
    where: {
      id: teacherId?.teacherId
    },
    data: {
      updatedAt: new Date()
    }
  })

  //   res.json({ msg: "新增評論成功", comment: newComment })
  return NextResponse.json({ msg: "新增評論成功", comment: newComment })
}

// 更新評論 要同個使用者才能更新
export const PATCH = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  const { id, courseId, comment } = await req.json()
  // 判斷是否為同個使用者
  const sameUser = await prisma.review.findUnique({
    where: {
      id,
      userId: auth.id
    },
    select: {
      id: true
    }
  })

  if (!sameUser) {
    // res.status(401).json({ msg: "權限不足" })
    // return
    return NextResponse.json({ msg: "權限不足" })
  }

  const updatedComment = await prisma.review.update({
    where: {
      id
    },
    data: {
      comment
    }
  })

  // 把課程的 updateAt 更新
  await prisma.course.update({
    where: {
      id: courseId
    },
    data: {
      updatedAt: new Date()
    }
  })

  // 把老師的 updateAt 更新
  const teacherId = await prisma.course.findUnique({
    where: {
      id: courseId
    },
    select: {
      teacherId: true
    }
  })

  await prisma.teacher.update({
    where: {
      id: teacherId?.teacherId
    },
    data: {
      updatedAt: new Date()
    }
  })

  //   res.json({ msg: "更新評論成功", comment: updatedComment })
  return NextResponse.json({ msg: "更新評論成功", comment: updatedComment })
}

// 刪除評論 要同個使用者才能刪除
export const DELETE = async (req: NextRequest) => {
  const auth = await getCurrentUser()
  const { id } = await req.json()
  // 判斷是否為同個使用者
  const sameUser = await prisma.review.findFirst({
    where: {
      id,
      userId: auth.id
    }
  })

  if (!sameUser) {
    // res.status(401).json({ msg: "權限不足" })
    // return
    return NextResponse.json({ msg: "權限不足" })
  }

  await prisma.review.delete({
    where: {
      id
    }
  })

  //   res.json({ msg: "刪除評論成功" })
  return NextResponse.json({ msg: "刪除評論成功" })
}
