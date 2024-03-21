import { cookies } from "next/headers"

import { site } from "@/config/site"

const getBookCount = async (userId: string) => {
  const res = await fetch(`${site.url}/api/book?type=count&userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    }
  })
  const data = await res.json()
  return data.count
}

const BookCount = async ({ userId }: { userId: string }) => {
  const count = await getBookCount(userId)
  return <p className='w-5 font-mono text-lg'>{count.toString().padStart(2, "0")}</p>
}

export default BookCount
