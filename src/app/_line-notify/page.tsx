"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { IconLoader2 } from "@tabler/icons-react"

const LineNotify = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const callbackUrl = Cookies.get("callbackUrl")
    const status = searchParams.get("status")
    const msg = searchParams.get("msg")
    const verify = async () => {
      // 延遲 1 秒
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (status && msg) {
        if (status === "success") {
          toast.success(msg)
          router.push(`${callbackUrl}`)
        } else {
          toast.error(msg)
          router.push(`${callbackUrl}`)
        }
      }
    }
    verify()
  }, [router, searchParams])

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4 p-4'>
      <img src='https://hihimsg.com/images/line_notify.png' alt='line-notify' className='h-80' />
      <IconLoader2 size={60} className='animate-spin' />
    </div>
  )
}

export default LineNotify
