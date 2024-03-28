"use client"

import React from "react"

import { IconLoader2, IconUserPlus } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

const UserCount = () => {
  type UserCount = {
    today: number
    total: number
  }

  const { data: userCount, isLoading } = useQuery<UserCount>({
    queryKey: ["userCount"],
    queryFn: async () => {
      const res = await fetch("/api/user?type=count")
      return res.json()
    }
  })

  return (
    <>
      <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
        <h3 className='text-xl font-bold'>今日註冊</h3>
        <div className='flex items-center gap-1'>
          <IconUserPlus />
          <p className='font-mono text-lg'>
            {isLoading ? (
              <IconLoader2 size={20} className='animate-spin' />
            ) : (
              userCount?.today.toString().padStart(2, "0")
            )}
          </p>
        </div>
      </div>
      <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
        <h3 className='text-xl font-bold'>總註冊數</h3>
        <div className='flex items-center gap-1'>
          <IconUserPlus />
          <p className='font-mono text-lg'>
            {isLoading ? <IconLoader2 size={20} className='animate-spin' /> : userCount?.total}
          </p>
        </div>
      </div>
    </>
  )
}

export default UserCount
