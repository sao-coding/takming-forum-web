"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Course } from "@/types"
import { IconStarFilled } from "@tabler/icons-react"

const Card = ({ course }: { course: Course }) => {
  return (
    <li>
      <Link
        href={`/teacher/${course.teacherId}/course/${course.id}`}
        className='flex justify-between rounded-2xl bg-white p-4 shadow hover:bg-muted'
      >
        {/* 課程名稱 */}
        <motion.h2
          className='line-clamp-1 text-xl font-bold'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {course.name}
        </motion.h2>
        <div className='flex items-center gap-1'>
          <motion.span
            className='w-[100px] text-right text-muted-foreground'
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            （{course.totalRating}則評論）
          </motion.span>
          <motion.div
            className='flex items-center gap-1'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconStarFilled className='text-amber-500' />
            <span className='text-amber-500'>{course.averageRating}</span>
          </motion.div>
        </div>
      </Link>
    </li>
  )
}

export default Card
