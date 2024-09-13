"use server"

import { cookies } from "next/headers"

import { site } from "@/config/site"

export const sendLineNotify = async (userId: string, postId: string) => {
  const res = await fetch(`${site.url}/api/line-notify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    },
    body: JSON.stringify({
      userId,
      postId
    })
  })

  const data = await res.json()
  return data
}
