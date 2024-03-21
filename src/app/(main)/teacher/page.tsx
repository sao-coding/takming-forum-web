"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { Input } from "@/components/ui/input"
import { Teacher } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { HoverEffect } from "./card-hover-effect"
import NewTeacherButton from "./new-teacher-button"

const Loading = () => {
  return (
    <div className='h-full w-full p-2'>
      <div className='flex h-full w-full flex-col items-center gap-2 rounded-3xl bg-white p-4 shadow'>
        <div className='h-full w-full px-4'>
          <div className='aspect-square w-full animate-pulse rounded-full bg-input' />
        </div>
        <div className='my-0.5 h-6 w-1/2 animate-pulse rounded-full bg-input' />
      </div>
    </div>
  )
}

const TeacherPage = () => {
  const [search, setSearch] = React.useState<string>("")
  const searchParams = useSearchParams()
  const router = useRouter()

  React.useEffect(() => {
    setSearch(searchParams.get("search") || "")
  }, [searchParams])

  React.useEffect(() => {
    // 將搜尋字串加入網址列
    router.replace(`/teacher?search=${search}`)
  }, [search, router])

  const { data: teachers, isLoading } = useQuery<Teacher[]>({
    queryKey: ["teachers", search],
    queryFn: async () => {
      const res = await fetch(`/api/teacher?search=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      return data.teachers
    }
  })

  return (
    <motion.div
      className='flex flex-col gap-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-2xl font-bold sm:text-3xl'>選擇老師</h1>
        <Input
          type='search'
          className='flex-1'
          placeholder='搜尋老師'
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <NewTeacherButton />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5'>
        {isLoading
          ? Array.from({ length: 60 }).map((_, idx) => <Loading key={idx} />)
          : teachers && <HoverEffect teachers={teachers} />}
      </div>
    </motion.div>
  )
}
export default TeacherPage
