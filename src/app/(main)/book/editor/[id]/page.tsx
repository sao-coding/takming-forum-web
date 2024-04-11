import React from "react"
import { cookies } from "next/headers"

import { site } from "@/config/site"

import EditForm from "./form"

const getbookPost = async (id: string) => {
  const res = await fetch(`${site.url}/api/book?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    }
  })
  const data = await res.json()
  return data.book
}

const bookEditorPage = async ({ params }: { params: { id: string } }) => {
  if (params.id === "new") {
    return <EditForm post={null} />
  }
  const post = await getbookPost(params.id)

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl font-bold'>賣書</h1>
      <EditForm post={post} />
    </div>
  )
}

export default bookEditorPage
