"use client"

import { motion } from "framer-motion"

import { Post } from "@/types"
import { IconDotsVertical } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import Card from "./card"

const Loading = () => {
  return (
    <article className='flex justify-between border-b py-4'>
      <div className='flex h-20 flex-1 flex-col gap-2'>
        <div className='flex items-center gap-1'>
          <div className='h-10 w-10 rounded-full bg-input' />
          <div className='h-4 w-28 rounded-full bg-input' />
        </div>
        <div className='h-4 w-40 rounded-full bg-input' />
      </div>
      <IconDotsVertical />
    </article>
  )
}

const HomePage = () => {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["post"],
    queryFn: async () => {
      const res = await fetch(`/api/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await res.json()

      return data.posts
    }
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='flex flex-col gap-4'
    >
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold sm:text-3xl'>閒聊</h1>

        {/* <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link
            href='/editor'
            className='rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white'
          >
            發表
          </Link>
        </motion.div> */}
      </div>
      <div>
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => <Loading key={i} />)
          : data?.map((post) => <Card key={post.id} post={post} />)}
      </div>
    </motion.div>
  )
}

export default HomePage
