import React from "react"

import Fancybox from "@/components/ui/fancybox"
import Img from "@/components/ui/img"
import { Log } from "@/types"
import Link from "next/link"

const Card = React.forwardRef<HTMLLIElement, { log: Log }>(({ log }, ref) => {
  // React.forwardRef<ref 的 type, props 的 type>((props, ref) => {})

  return (
    <li ref={ref} className='flex h-48 flex-col justify-between border-b pb-2'>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <Fancybox
            options={{
              Carousel: {
                infinite: false
              }
            }}
          >
            <a href={log.user.picture} data-fancybox data-caption={log.user.name}>
              <div className='relative aspect-square w-20 overflow-hidden rounded-full border'>
                <Img
                  src={log.user.picture || "https://x"}
                  alt={log.user.name}
                  className='absolute top-0 h-full w-full rounded-xl object-cover object-top transition-transform duration-300 hover:scale-105'
                  fallback={
                    <div className='flex h-full w-full items-center justify-center bg-gray-300'>
                      <div className='text-5xl font-bold text-white'>
                        {/* 只顯示姓名 */}
                        {log.user.name.split("")[0]}
                      </div>
                    </div>
                  }
                />
              </div>
            </a>
          </Fancybox>
          <div className='text-end'>
            <p>{log.user.studentId}</p>
            <p>{log.user.name}</p>
            <p>{log.user.UserSettings[0].username}</p>
          </div>
        </div>

        <div className='flex justify-between font-mono'>
          <p>{log.ip}</p>
          <p className='space-y-2'>
            {JSON.parse(log.searchParams).length !== 0 ? (
              JSON.parse(log.searchParams).map((item: { key: string; value: string }) => {
                return (
                  <div key={item.key} className='flex justify-end'>
                    <span className='rounded-full bg-orange-300 px-1'>
                      {item.key}:{item.value}
                    </span>
                  </div>
                )
              })
            ) : (
              <span>沒有參數</span>
            )}
          </p>
        </div>
      </div>
      <div className='flex justify-between font-mono'>
        {/* 若 title 參數為 undefined，則顯示 pathname 否則顯示 title */}
        <Link href={log.pathname} className='rounded-md bg-orange-300 px-1'>
          {log.title ? <>{log.title}</> : <>{log.pathname}</>}
        </Link>
        <p>{new Date(log.createdAt).toLocaleString()}</p>
      </div>
    </li>
  )
})

Card.displayName = "Card"

export default Card
