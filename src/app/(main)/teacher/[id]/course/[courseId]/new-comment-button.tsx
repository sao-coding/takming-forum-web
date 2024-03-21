"use client"

import React from "react"
import { motion } from "framer-motion"
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
import { Textarea } from "@/components/ui/textarea"
import { IconMessagePlus } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"

import Rating from "./rating"

const NewCommentButton = ({ courseId }: { courseId: string }) => {
  const [open, setOpen] = React.useState(false)
  const [ratingValue, setRatingValue] = React.useState<number>(0)
  const queryClient = useQueryClient()

  const onSubmit = async () => {
    if (!ratingValue) {
      toast.error("請評分")
      return
    }

    const courseComment = document.querySelector("#course-comment") as HTMLTextAreaElement
    if (!courseComment.value) {
      toast.error("評論不得為空")
      return
    }

    const toastId = toast.loading("新增評論中")

    const res = await fetch(`/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ courseId, rating: ratingValue, comment: courseComment.value })
    })
    const result = await res.json()
    if (!res.ok) {
      toast.error(`新增評論失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      toast.success("新增評論成功", { id: toastId })
      setRatingValue(0)
      courseComment.value = ""
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ["course", courseId] })
      queryClient.invalidateQueries({ queryKey: ["comments", courseId] })
    }
  }

  // 常用語句：
  const commonSentences = [
    "很容易修過",
    "老師教學用心",
    "課程結構清晰",
    "教學枯燥",
    "老師不給力",
    "課程無趣",
    "很難修過"
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='fixed bottom-0 right-0 p-4 xl:right-96'>
          <motion.button
            className='rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white'
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconMessagePlus />
          </motion.button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增評論</DialogTitle>
          <DialogDescription>請輸入你的評論</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Rating ratingValue={ratingValue} setRatingValue={setRatingValue} />
          <Textarea placeholder='請輸入評論' id='course-comment' />
          <div className='flex flex-wrap gap-2'>
            {commonSentences.map((sentence) => (
              <button
                className='text-nowrap rounded-full border border-gray-300 px-2 py-1 text-sm transition-colors hover:bg-muted'
                key={sentence}
                onClick={() => {
                  const courseComment = document.querySelector(
                    "#course-comment"
                  ) as HTMLTextAreaElement
                  courseComment.value = sentence
                }}
              >
                {sentence}
              </button>
            ))}
          </div>
          <Button onClick={onSubmit}>送出</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default NewCommentButton
