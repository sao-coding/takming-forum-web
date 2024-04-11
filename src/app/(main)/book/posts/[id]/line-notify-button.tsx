"use client"

import { toast } from "sonner"

import { site } from "@/config/site"
import { UserSettings } from "@/types"
import { IconBell } from "@tabler/icons-react"

const LineNotifyButton = ({ id }: { id: string }) => {
  const getContact = async () => {
    const res = await fetch(`/api/user?type=settings`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    return data.contact as UserSettings
  }

  const sendContact = async () => {
    const contact = await getContact()
    const message = `二手書\n我想購買你的書\n${site.url}${"/book/posts/"}${id}\n我的聯絡方式是：\nEmail:\n${contact.email}\n電話:\n${contact.phone || "未填寫"}\nLine:\n${contact.lineId || "未填寫"}\nIG:\n${contact.igId || "未填寫"}`
    // console.log("message", message)
    if (!contact.email && !contact.phone && !contact.lineId && !contact.igId) {
      toast.error("請先填寫聯絡方式")
      return
    }
    if (contact.lineNotifyStatus && contact.lineNotifyToken) {
      const res = await fetch(`/api/line-notify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("已傳送聯絡方式給賣家")
      } else {
        toast.error(`傳送聯絡方式失敗: ${data.msg}`)
        return
      }
    } else {
      toast.error("請先開啟 Line Notify 通知")
    }
  }
  return (
    <>
      <h2 className='text-2xl font-bold'>傳送聯絡方式</h2>
      <button
        className='group mr-auto flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 px-4 py-2 text-white'
        onClick={sendContact}
      >
        <IconBell className='group-hover:animate-tada transition-all duration-300 group-hover:fill-yellow-500 group-hover:text-yellow-500' />
        {/* 聯絡賣家 */}
        <span className='font-bold'>聯絡賣家</span>
      </button>
    </>
  )
}

export default LineNotifyButton
