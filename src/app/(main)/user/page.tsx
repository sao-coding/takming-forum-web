import React from "react"
import Link from "next/link"

import Img from "@/components/ui/img"
import { getCurrentUser } from "@/lib/get-current-user"
import {
  IconBooks,
  IconCalendarPlus,
  IconFilePencil,
  IconHelp,
  IconId,
  IconLoader2,
  IconMessage,
  IconMessageCircle
} from "@tabler/icons-react"

import BookCount from "./book-count"
import ReviewCount from "./review-count"

const UserPage = async () => {
  const user = await getCurrentUser()

  return (
    <div className='flex flex-col gap-4'>
      <div className='my-4 flex items-center gap-4'>
        <div className='h-36 w-36 overflow-hidden rounded-full'>
          <Img
            src={user.picture}
            alt={user.name || ""}
            className='h-full w-full object-cover'
            fallback={
              <div className='flex h-full w-full items-center justify-center bg-gray-300'>
                <span className='text-3xl font-bold text-gray-500'>{user.familyName}</span>
              </div>
            }
          />
        </div>
        <div className=''>
          <h1 className='text-3xl font-bold'>{user.name}</h1>
          <div className='flex items-center gap-1'>
            <IconId />
            <p className='font-mono text-lg'>{user.studentId}</p>
          </div>
          {/* 創建時間: {new Date(user.createdAt).toLocaleString()} */}
          <div className='flex items-center gap-1 text-gray-500'>
            <IconCalendarPlus className='h-5 w-5' />
            <span>
              {new Date(user.createdAt).toLocaleDateString("zh-Hant-TW", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>數據統計</h2>
        <div className='grid grid-cols-2 gap-2'>
          {/* 文章數量 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>文章</h3>
            <div className='flex items-center gap-1'>
              <IconFilePencil />
              <p className='font-mono text-lg'>0</p>
            </div>
          </div>
          {/* 二手書 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>二手書</h3>
            <div className='flex items-center gap-1'>
              <IconBooks />
              <React.Suspense fallback={<IconLoader2 size={20} className='animate-spin' />}>
                <BookCount userId={user.id} />
              </React.Suspense>
            </div>
          </div>
          {/* 留言數量 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>留言</h3>
            <div className='flex items-center gap-1'>
              <IconMessage />
              <p className='font-mono text-lg'>0</p>
            </div>
          </div>
          {/* 評分數量 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>評分</h3>
            <div className='flex items-center gap-1'>
              <IconMessageCircle />
              {/* <p className='font-mono text-lg'>{reviewCount?.toString().padStart(2, "0")}</p> */}
              <React.Suspense fallback={<IconLoader2 size={20} className='animate-spin' />}>
                <ReviewCount />
              </React.Suspense>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap items-end gap-2'>
          <h2 className='text-2xl font-bold'>問題回報</h2>
          <span>如果您在使用本網站時遇到任何問題，請透過以下方式聯絡我們。</span>
        </div>
        <Link
          href='https://github.com/sao-coding/takming-forum/issues'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
        >
          <IconHelp />
          <span>問題回報表單</span>
        </Link>
      </div>
    </div>
  )
}

export default UserPage
