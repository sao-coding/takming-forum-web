"use client"
import Link from "next/link"
import { motion } from "framer-motion"

import Img from "@/components/ui/img"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BookCard } from "@/types"
import { IconCoin, IconPhotoOff } from "@tabler/icons-react"

const Card = ({ card }: { card: BookCard }) => {
  return (
    <motion.div
      className='flex flex-col gap-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // ref={ref}
    >
      <Link
        className='relative aspect-[2/3] w-full overflow-hidden rounded-xl border'
        href={`/book/posts/${card.id}`}
      >
        <Img
          // src='https://www.kadokawa.com.tw/cdn/shop/products/product_202010121633511_450x666_crop_center.jpg'
          src={card.cover || ""}
          alt={card.title}
          className='absolute top-0 h-full w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105'
          fallback={
            <div className='flex h-full w-full items-center justify-center bg-gray-300'>
              <IconPhotoOff size={40} />
            </div>
          }
        />

        <div className='absolute left-0 top-0 p-2'>
          <div className='rounded-md bg-orange-500/50 px-1 text-sm text-white backdrop-blur'>
            {card.category}
          </div>
        </div>
        {card.sold && (
          <div className='absolute right-0 top-0 p-2'>
            <div className='rounded-md bg-red-500 px-2 py-1 text-sm text-white'>已售出</div>
          </div>
        )}
        <div className='absolute bottom-0 right-0 p-2'>
          <div className='rounded-md bg-orange-500/50 px-1 text-sm text-white backdrop-blur'>
            {card.user.studentId}
          </div>
        </div>
        <div className='absolute bottom-0 left-0 p-2'>
          <div className='rounded-md bg-orange-500/50 px-1 text-sm text-white backdrop-blur'>
            {card.deliveryMethod}
          </div>
        </div>
      </Link>
      <div>
        {/* <h3 className='line-clamp-1 text-ellipsis text-lg font-bold'>
          高階消費者行為分析師（乙級）行為分析分析師（丙級）認證題庫
        </h3> */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            {/* [data-state] instant-open */}
            <TooltipTrigger asChild>
              <h3 className='line-clamp-1 text-lg font-bold'>{card.title}</h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{card.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className='line-clamp-1'>{card.author}</p>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <IconCoin className='text-amber-500' />
            {card.price}
          </div>
          <div className='font-mono'>
            {new Date(card.createdAt).toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Card
