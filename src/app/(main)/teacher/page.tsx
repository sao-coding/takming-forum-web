"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Teacher } from "@/types"
import { useQuery } from "@tanstack/react-query"

import { HoverEffect } from "./card-hover-effect"
import NewTeacherButton from "./new-teacher-button"

const deptList = [
  {
    deptId: "12",
    deptName: "財稅系"
  },
  {
    deptId: "13",
    deptName: "國貿系"
  },
  {
    deptId: "14",
    deptName: "企管系"
  },
  {
    deptId: "16",
    deptName: "資管系"
  },
  {
    deptId: "17",
    deptName: "財金系"
  },
  {
    deptId: "18",
    deptName: "應外系"
  },
  {
    deptId: "19",
    deptName: "資科系"
  },
  {
    deptId: "21",
    deptName: "會資系"
  },
  {
    deptId: "22",
    deptName: "媒計系"
  },
  {
    deptId: "23",
    deptName: "行銷系"
  },
  {
    deptId: "29",
    deptName: "流通系"
  },
  {
    deptId: "51",
    deptName: "風富系"
  },
  {
    deptId: "92",
    deptName: "通識中心"
  },
  {
    deptId: "93",
    deptName: "體育室"
  }
]

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
    // router.replace(`/teacher?search=${search}`)
    if (search !== "") {
      router.replace(`/teacher?search=${search}`)
    } else {
      router.replace(`/teacher`)
    }
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
      {/* 篩選系別 */}
      <div className='flex gap-2 overflow-x-auto pb-1 md:flex-wrap'>
        {deptList.map((dept) => (
          <Button
            variant={"outline"}
            key={dept.deptId}
            className='h-8 rounded-full'
            onClick={() => setSearch(dept.deptId)}
          >
            {dept.deptName}
          </Button>
        ))}
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
