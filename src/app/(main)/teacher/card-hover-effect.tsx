"use client"

import { useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"

import { Teacher } from "@/types"

import Card from "./card"

export const HoverEffect = ({ teachers }: { teachers: Teacher[] }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      {teachers.map((teacher, idx) => (
        <Link
          href={`/teacher/${teacher?.id}`}
          key={teacher?.id}
          className='group relative block h-full w-full p-2'
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className='absolute inset-0 block h-full w-full rounded-3xl bg-neutral-200'
                layoutId='hoverBackground'
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 }
                }}
              />
            )}
          </AnimatePresence>
          <Card teacher={teacher} />
        </Link>
      ))}
    </>
  )
}
