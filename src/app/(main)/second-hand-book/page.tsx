"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { toast } from "sonner"

import { BookCard, UserSettings } from "@/types"
import { IconPhotoOff } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import Card from "./card"
import Pagination from "./pagination"

const Loading = () => {
  return (
    <div className='flex animate-pulse flex-col gap-1'>
      <div className='relative aspect-[2/3] w-full overflow-hidden rounded-xl border'>
        <div className='flex h-full w-full items-center justify-center bg-gray-300'>
          <IconPhotoOff size={40} />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <h3 className='my-1.5 h-4 w-4/5 rounded-full bg-gray-300' />
        <p className='my-1 h-3 w-3/4 rounded-full bg-gray-300' />
        <div className='my-1 flex items-center justify-between'>
          <div className='h-3 w-2/5 rounded-full bg-gray-300' />
          <div className='h-3 w-2/4 rounded-full bg-gray-300' />
        </div>
      </div>
    </div>
  )
}

const SecondHandBookPage = () => {
  const [pageContent, setPageContent] = React.useState(0)
  const searchParams = useSearchParams()
  const router = useRouter()
  const page = Number(searchParams.get("page")) || 1

  const { data: cards, isLoading } = useQuery<BookCard[]>({
    queryKey: ["cards", page],
    queryFn: async () => {
      const res = await fetch(`/api/book?page=${page}&perPage=10`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()

      setPageContent(Math.ceil(data.count / 10))

      return data.books
    }
  })

  // 獲取 user LineNotifyToken
  const getLineNotifyToken = async () => {
    const res = await fetch(`/api/user?type=settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const { contact } = await res.json()
    const data = contact as UserSettings

    if (data.lineNotifyStatus === false || data.lineNotifyToken === false) {
      return toast.error("請先開啟 Line Notify 通知")
    }

    router.push("/second-hand-book/editor/new")
  }

  // 若超出頁數，則跳轉到第一頁
  React.useEffect(() => {
    if (page > pageContent && pageContent !== 0) {
      // setSearchParams({ page: "1" })
      router.push("/second-hand-book?page=1")
    }
  }, [page, pageContent, router])

  return (
    // 從右邊滑到左邊
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex flex-col gap-4'
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold sm:text-3xl'>二手書</h1>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <button
            className='rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white'
            onClick={getLineNotifyToken}
          >
            賣書
          </button>
        </motion.div>
      </div>
      <div>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5'>
          {isLoading
            ? Array.from({ length: 30 }).map((_, i) => <Loading key={i} />)
            : cards?.map((card) => <Card key={card.id} card={card} />)}
        </div>

        <Pagination page={page} pageContent={pageContent} />
      </div>
    </motion.div>
  )
}

export default SecondHandBookPage
