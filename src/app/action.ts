"use server"

import { cookies } from "next/headers"

import { site } from "@/config/site"
import { BookPost } from "@/types"
import { generateText } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

export const sendNotify = async (post: BookPost) => {
  const res = await fetch(`${site.url}/api/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    body: JSON.stringify({
      id: post.id,
      title: post.title,
      cover: post.cover,
      price: post.price,
      userId: post.userId,
      content: generateText(post.content, [StarterKit])
    })
  })

  const data = await res.json()
  return data
}
