import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const type = req.nextUrl.searchParams.get("type")
  const id = req.nextUrl.searchParams.get("id")
  const userId = req.nextUrl.searchParams.get("userId")
  const page = Number(req.nextUrl.searchParams.get("page")) || 1
  const perPage = Number(req.nextUrl.searchParams.get("perPage")) || 10
  const skip = (page - 1) * perPage
  const take = perPage

  // 分頁
  // 獲取所有書籍資訊 + 顯示User studentId

  if (type === "count" && userId) {
    // 使用者發布的二手書數量
    const booksCount = await prisma.book.count({
      where: {
        userId: userId as string
      }
    })
    // return res.json({ msg: "獲取書籍數量成功", count: booksCount })
    return NextResponse.json({ msg: "獲取書籍數量成功", count: booksCount })
  }

  // 獲取書籍總數量
  const booksCount = await prisma.book.count()

  const books = await prisma.book.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: true,
      cover: true,
      title: true,
      category: true,
      price: true,
      sold: true,
      deliveryMethod: true,
      createdAt: true,
      user: {
        select: {
          studentId: true
        }
      }
    }
  })

  if (id) {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            studentId: true,
            picture: true
          }
        }
      }
    })
    if (!book) {
      //   return res.status(404).json({ msg: "找不到書籍" })
      return NextResponse.json({ msg: "找不到書籍" }, { status: 404 })
    }
    // res.json({ msg: "獲取書籍資訊成功", book })
    return NextResponse.json({ msg: "獲取書籍資訊成功", book })
  }

  //   res.json({ msg: "獲取書籍資訊成功", books, count: booksCount })
  return NextResponse.json({ msg: "獲取書籍資訊成功", books, count: booksCount })
}

// 創建書籍
export const POST = async (req: NextRequest) => {
  const { cover, title, author, isbn, price, publisher, category, deliveryMethod, content, sold } =
    await req.json()

  const auth = await getCurrentUser()
  console.log("auth id", auth.id)
  const book = await prisma.book.create({
    data: {
      cover,
      title,
      author,
      isbn,
      price,
      publisher,
      category,
      deliveryMethod,
      content,
      sold,
      userId: auth.id
      // user: {
      //   connect: {
      //     id: auth.id
      //   }
      // }
    }
  })
  //   res.json({ msg: "新增書籍成功", book })
  return NextResponse.json({ msg: "新增書籍成功", book })
}

// 更新書籍
export const PUT = async (req: NextRequest) => {
  const book = await req.json()

  const auth = await getCurrentUser()
  const sameUser = await prisma.book.findUnique({
    where: {
      id: book.id,
      userId: auth.id
    },
    select: {
      userId: true
    }
  })

  if (!sameUser) {
    // return res.status(401).json({ msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 401 })
  }

  const updatedBook = await prisma.book.update({
    where: {
      id: book.id
    },
    data: book
  })

  //   res.json({ msg: "更新書籍資訊成功", book: updatedBook })
  return NextResponse.json({ msg: "更新書籍資訊成功", book: updatedBook })
}

// 更新書籍資訊 PATCH 必須是書籍擁有者才能更新
export const PATCH = async (req: NextRequest) => {
  const book = await req.json()

  const auth = await getCurrentUser()
  const sameUser = await prisma.book.findUnique({
    where: {
      id: book.id,
      userId: auth.id
    },
    select: {
      userId: true
    }
  })

  if (!sameUser) {
    // return res.status(401).json({ msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 401 })
  }

  const updatedBook = await prisma.book.update({
    where: {
      id: book.id
    },
    data: book
  })

  //   res.json({ msg: "更新書籍資訊成功", book: updatedBook })
  return NextResponse.json({ msg: "更新書籍資訊成功", book: updatedBook })
}

// 刪除書籍
export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id")
  const auth = await getCurrentUser()

  if (!id) {
    // return res.status(400).json({ msg: "缺少書籍 id" })
    return NextResponse.json({ msg: "缺少書籍 id" }, { status: 400 })
  }

  const book = await prisma.book.findUnique({
    where: {
      id
    },
    select: {
      userId: true
    }
  })

  if (!book || book.userId !== auth.id) {
    // return res.status(401).json({ msg: "權限不足" })
    return NextResponse.json({ msg: "權限不足" }, { status: 401 })
  }

  await prisma.book.delete({
    where: {
      id
    }
  })

  //   res.json({ msg: "刪除書籍成功" })
  return NextResponse.json({ msg: "刪除書籍成功" })
}
