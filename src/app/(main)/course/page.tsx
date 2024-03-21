"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { CourseInfo } from "@/types"
import { IconExclamationCircle } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import Card from "./card"

const Loading = () => {
  return (
    <div className='flex h-full w-full flex-col rounded-2xl bg-white p-4 shadow'>
      <div className='my-1 h-5 w-36 animate-pulse rounded-2xl bg-input' />
      <div className='flex justify-between'>
        <div className='my-1 h-4 w-36 animate-pulse rounded-2xl bg-input' />
        <div className='my-1 h-4 w-14 animate-pulse rounded-2xl bg-input' />
      </div>
    </div>
  )
}

const Course = () => {
  const [search, setSearch] = React.useState<string>("")

  const { data, isLoading } = useQuery<CourseInfo[]>({
    queryKey: ["courses", search],
    queryFn: async () => {
      const res = await fetch(`/api/course?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data.courses
    }
  })
  return (
    <motion.div
      className='flex flex-col gap-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex h-10 items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold'>課程評價</h1>
        <Input
          type='search'
          className='flex-1'
          placeholder='搜尋課程'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        {/* 選擇老師 */}
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href='/teacher'
            className='rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white'
          >
            選擇老師
          </Link>
        </motion.div>
      </div>
      {/* 如果沒有找到課程，可以點擊<Link to='https://forms.gle/QQycyiD9SXBmXTGXA'>這裡</Link>新增課程 */}
      <Alert variant='destructive'>
        <IconExclamationCircle />
        <AlertTitle>找不到課程？</AlertTitle>
        <AlertDescription>
          你可以點擊
          <a href='https://forms.gle/QQycyiD9SXBmXTGXA' className='rounded px-1 hover:bg-blue-100'>
            這裡
          </a>
          新增課程
        </AlertDescription>
      </Alert>
      {/* 課程 */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3'>
        {isLoading
          ? Array.from({ length: 30 }).map((_, i) => <Loading key={i} />)
          : data?.map((course) => <Card key={course.id} course={course} />)}
      </div>
    </motion.div>
  )
}

export default Course
