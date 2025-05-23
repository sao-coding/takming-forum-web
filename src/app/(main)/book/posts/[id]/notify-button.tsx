"use client"

import React from "react"
import { toast } from "sonner"

import { sendNotify } from "@/app/action"
import { cn } from "@/lib/utils"
import { BookPost } from "@/types"
import { IconBell } from "@tabler/icons-react"

const NotifyButton = ({ post }: { post: BookPost }) => {
  const [count, setCount] = React.useState(post.contactCount)
  const sendMassage = async () => {
    const toastId = toast.loading("傳送中...")
    const res = await sendNotify(post)
    if (res.msg === "傳送訊息成功") {
      toast.success(res.msg, { id: toastId })
      setCount(res.contactCount)
    } else if (res.msg === "您只填寫了 Email 聯絡方式") {
      toast.warning(`傳送訊息成功: ${res.msg}`, { id: toastId })
      setCount(res.contactCount)
    } else {
      toast.error(`傳送聯絡方式失敗: ${res.msg}`, { id: toastId })
    }
  }

  return (
    <>
      <h2 className='text-2xl font-bold'>傳送聯絡方式</h2>
      <div className='flex gap-2'>
        <button
          // className='group flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-white'
          className={cn(
            "group flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-white",
            {
              "cursor-not-allowed from-gray-700 to-gray-500": post.sold
            }
          )}
          onClick={sendMassage}
          disabled={post.sold}
        >
          <IconBell
            // className='group-hover:animate-tada transition-all duration-300 group-hover:fill-yellow-500 group-hover:text-yellow-500'
            className={cn(
              !post.sold &&
                "group-hover:animate-tada transition-all duration-300 group-hover:fill-yellow-500 group-hover:text-yellow-500"
            )}
          />
          {/* 聯絡賣家 */}
          <span className='font-bold'>聯絡賣家</span>
          <span className='font-bold'>+{count}</span>
        </button>
      </div>
    </>
  )
}

export default NotifyButton
