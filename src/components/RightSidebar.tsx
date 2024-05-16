"use client"

import Link from "next/link"

import { useMediaQuery } from "@/hooks/use-media-query"
import { useQuery } from "@tanstack/react-query"

export type Announcement = {
  // link: string
  id: string
  title: string
  sticky: boolean
  category: string
  unit: string
  date: string
  deadline: string
}

const RightSidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)")
  const { data } = useQuery<Announcement[]>({
    queryKey: ["school-announcement", isDesktop],
    queryFn: async () => {
      if (isDesktop) {
        const res = await fetch(
          `https://tipx.sao-x.com/api/post?type=all&limit=10&exclude=outside`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        const data = await res.json()
        return data
      } else {
        return []
      }
    }
  })
  return (
    <section className='sticky top-0 hidden h-screen w-[350px] overflow-auto bg-white p-6 pt-24 xl:block'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>最新公告</h2>
          {/* <Link to='https://tipx.sao-x.com' className='flex items-center gap-2'>
            <img
              src='https://tipx.sao-x.com/favicon-32x32.png'
              alt='tipx'
              className='h-8 w-8 rounded-full'
            />
            <span className='rounded-lg bg-muted px-2 py-1 text-sm hover:bg-input'>查看更多</span>
          </Link> */}
        </div>
        <div className='flex flex-col gap-4'>
          {data &&
            data.map((post) => (
              <Link
                href={`https://tipx.sao-x.com/post/${post.id}`}
                key={post.id}
                className='rounded-lg bg-muted p-4 shadow-md hover:bg-input'
              >
                <h3 className='line-clamp-2'>{post.title}</h3>
              </Link>
            ))}
        </div>
        {/* 只顯示最新10則公告 */}
        <span className='text-right text-sm text-gray-500'>只顯示最新10則公告</span>
      </div>
    </section>
  )
}

export default RightSidebar
