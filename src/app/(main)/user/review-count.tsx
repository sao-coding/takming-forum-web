import { cookies } from "next/headers"

import { site } from "@/config/site"

const getReviewCount = async () => {
  const res = await fetch(`${site.url}/api/review?type=count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString()
    }
  })
  const data = await res.json()
  return data.count
}

const ReviewCount = async () => {
  const count = await getReviewCount()
  console.log(count)
  return <p className='w-5 font-mono text-lg'>{count.toString().padStart(2, "0")}</p>
}

export default ReviewCount
