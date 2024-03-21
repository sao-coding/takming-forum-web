"use client"

import { cn } from "@/lib/utils"
import { Rank } from "@/types"
import { useQuery } from "@tanstack/react-query"

const Loading = () => {
  return (
    <div className='relative flex items-center justify-between overflow-hidden rounded-2xl bg-white p-3 shadow'>
      <div className='flex flex-col gap-4'>
        <div className='h-4 w-20 animate-pulse rounded-full bg-input' />
        <div className='h-4 w-20 animate-pulse rounded-full bg-input' />
      </div>
      <div className='absolute right-0 animate-pulse text-8xl font-bold italic text-gray-300'>
        #
      </div>
    </div>
  )
}

const RankPage = () => {
  const { data, isLoading } = useQuery<Rank[]>({
    queryKey: ["rank"],
    queryFn: async () => {
      const res = await fetch(`/api/review?type=rank`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data.rank
    }
  })

  // 前三名顏色
  // 1: "text-amber-500",
  // 2: "text-red-500",
  // 3: "text-blue-500"
  const rankColor = ["text-amber-500", "text-red-500", "text-blue-500"]

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-2xl font-bold sm:text-3xl'>排名</h1>
      <ul className='flex flex-col gap-4'>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Loading key={i} />)
          : data?.map((item, i) => {
              return (
                <li
                  key={i}
                  className='relative flex items-center justify-between overflow-hidden rounded-2xl bg-white p-3 shadow'
                >
                  <div className='flex flex-col'>
                    {item.username} <span className='text-gray-400'>{item.count} 則評論</span>
                  </div>

                  <div
                    className={cn(
                      "absolute right-0 text-8xl font-bold italic text-gray-300",
                      rankColor[item.rank - 1]
                    )}
                  >
                    {item.rank}
                  </div>
                </li>
              )
            })}
      </ul>
    </div>
  )
}

export default RankPage
