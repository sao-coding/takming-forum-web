"use client"

import { toast } from "sonner"

import { sendLineNotify } from "@/app/action"
import { IconBell } from "@tabler/icons-react"

const LineNotifyButton = ({ userId, postId }: { userId: string; postId: string }) => {
  const sendMassage = async () => {
    const toastId = toast.loading("傳送中...")
    const res = await sendLineNotify(userId, postId)
    if (res.msg === "傳送訊息成功") {
      toast.success(res.msg, { id: toastId })
    } else if (res.msg === "您只填寫了 Email 聯絡方式") {
      toast.warning(`傳送訊息成功: ${res.msg}`, { id: toastId })
    } else {
      toast.error(`傳送聯絡方式失敗: ${res.msg}`, { id: toastId })
    }
  }

  return (
    <>
      <h2 className='text-2xl font-bold'>傳送聯絡方式</h2>
      <button
        className='group mr-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-white'
        onClick={sendMassage}
      >
        <IconBell className='group-hover:animate-tada transition-all duration-300 group-hover:fill-yellow-500 group-hover:text-yellow-500' />
        {/* 聯絡賣家 */}
        <span className='font-bold'>聯絡賣家</span>
      </button>
    </>
  )
}

export default LineNotifyButton
