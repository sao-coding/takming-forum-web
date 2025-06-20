import React from "react"
import Link from "next/link"

import Img from "@/components/ui/img"
import { getCurrentUser } from "@/lib/get-current-user"
import {
  IconBooks,
  IconCalendarEvent,
  IconCalendarPlus,
  IconFilePencil,
  IconHelp,
  IconId,
  IconLoader2,
  IconMessage,
  IconMessageCircle,
  IconNotes,
  IconReportAnalytics,
  IconUserHexagon
} from "@tabler/icons-react"

import BookCount from "./book-count"
import ReviewCount from "./review-count"
import UserCount from "./user-count"

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
        <div>
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
        {user.role !== "USER" && (
          <>
            <h2 className='text-2xl font-bold'>管理員功能</h2>
            {/* 日誌中心 */}
            <Link
              href='/user/log'
              className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
            >
              <IconNotes />
              <span>日誌中心</span>
            </Link>
            <Link
              href='/user/analytics'
              className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
            >
              <IconReportAnalytics />
              <span>數據統計</span>
            </Link>
          </>
        )}
        <h2 className='text-2xl font-bold'>數據統計</h2>
        <div className='grid grid-cols-2 gap-2'>
          {/* 文章數量 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>文章</h3>
            <div className='flex items-center gap-1'>
              <IconFilePencil />
              <p className='font-mono text-lg'>00</p>
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
              <p className='font-mono text-lg'>00</p>
            </div>
          </div>
          {/* 評分數量 */}
          <div className='flex w-full items-center justify-between rounded-2xl border p-4'>
            <h3 className='text-xl font-bold'>評分</h3>
            <div className='flex items-center gap-1'>
              <IconMessageCircle />
              <React.Suspense fallback={<IconLoader2 size={20} className='animate-spin' />}>
                <ReviewCount />
              </React.Suspense>
            </div>
          </div>
          {/* 今天註冊人數 */}
          <UserCount />
        </div>
        <h2 className='text-2xl font-bold'>TIPX</h2>
        <Link
          href='https://tipx.sao-x.com'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
        >
          <IconUserHexagon />
          <span>TIPX</span>
        </Link>
        <div className='flex flex-wrap items-end gap-2'>
          <h2 className='text-2xl font-bold'>問題回報</h2>
          <span>如果您在使用本網站時遇到任何問題，請透過以下方式聯絡我們。</span>
        </div>
        <Link
          href='https://github.com/sao-coding/takming-forum-web/issues'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
        >
          <IconHelp />
          <span>問題回報表單</span>
        </Link>
        <h2 className='text-2xl font-bold'>專案進度</h2>
        <Link
          href='https://github.com/users/sao-coding/projects/5/views/1'
          target='_blank'
          rel='noreferrer'
          className='flex items-center gap-2 rounded-2xl border p-4 text-lg font-bold hover:bg-input'
        >
          <IconCalendarEvent />
          <span>專案進度</span>
        </Link>
      </div>
    </div>
  )
}

export default UserPage
