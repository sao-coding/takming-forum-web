"use client"

import pathnameToTitle from "@/utils/pathname-to-title"

const TestPage = async () => {
  const title = await pathnameToTitle("/teacher")
  console.log("title", title)
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1>{title}</h1>
    </div>
  )
}

export default TestPage
