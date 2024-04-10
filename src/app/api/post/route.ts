import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id")

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      anonymous: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          picture: true,
          UserSettings: {
            select: {
              username: true
            }
          }
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })
  //   若 post anonymous 為 true，則不顯示 user 資訊
  const data = posts.map((post) => {
    if (post.anonymous) {
      return {
        ...post,
        user: null
      }
    }
    return post
  })

  if (id) {
    const post = await prisma.post.findUnique({
      where: {
        id: id as string
      },
      select: {
        id: true,
        title: true,
        content: true,
        anonymous: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            picture: true
          }
        }
      }
    })

    if (post?.anonymous) {
      post.user = {
        id: post.user.id,
        name: "匿名",
        picture: ""
      }
    }

    return NextResponse.json({ msg: "取得文章成功", post })
  }

  return NextResponse.json({ msg: "取得文章成功", posts: data })
}

export const POST = async (req: NextRequest) => {
  const auth = await getCurrentUser()

  const { title, content, anonymous } = await req.json()

  if (title === "") {
    // return res.status(400).send("標題不得為空")
    return NextResponse.json({ msg: "標題不得為空" }, { status: 400 })
  }

  if (content === "") {
    // return res.status(400).send("內容不得為空")
    return NextResponse.json({ msg: "內容不得為空" }, { status: 400 })
  }

  let post

  try {
    post = await prisma.post.create({
      data: {
        title,
        content,
        anonymous,
        user: {
          connect: {
            id: auth?.id
          }
        }
      }
    })
  } catch (error) {
    return NextResponse.json({ msg: "新增文章失敗" }, { status: 400 })
  }

  // res.json({ msg: "新增文章成功", post })
  return NextResponse.json({ msg: "新增文章成功", post })
}
