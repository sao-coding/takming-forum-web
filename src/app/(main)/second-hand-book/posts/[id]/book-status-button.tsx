"use client"

import React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { IconSettings } from "@tabler/icons-react"

const BookStatusButton = ({ id }: { id: string }) => {
  const [bookStatus, setBookStatus] = React.useState("")

  const editBookStatus = async (status: string) => {
    const res = await fetch(`/api/book`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: id, sold: status === "已售出" })
    })
    const data = await res.json()
    if (res.ok) {
      toast.success("設定書籍狀態成功")
    } else {
      toast.error(`設定書籍狀態失敗: ${data.msg}`)
    }
  }
  return (
    <Dialog>
      <DialogTrigger>
        <IconSettings className='transform transition-all duration-300 hover:rotate-180' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>設定</DialogTitle>
          <DialogDescription>編輯書籍資訊</DialogDescription>
        </DialogHeader>
        <Select value={bookStatus} onValueChange={(value) => setBookStatus(value)}>
          <SelectTrigger>
            <SelectValue placeholder='書籍狀態' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='未售出'>未售出</SelectItem>
            <SelectItem value='已售出'>已售出</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => editBookStatus(bookStatus)}>確定</Button>
      </DialogContent>
    </Dialog>
  )
}

export default BookStatusButton
