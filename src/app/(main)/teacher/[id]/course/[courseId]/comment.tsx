"use client"

import React from "react"
import { Session } from "next-auth"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { Review } from "@/types"
import formatDatetime from "@/utils/format-datetime"
import { IconEdit, IconPencil, IconSpy, IconStar, IconTrash } from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"

const Comment = ({ user, comment }: { user: Session["user"]; comment: Review }) => {
  const [modal, setModal] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState<boolean>(false)
  const queryClient = useQueryClient()

  const onSubmit = async () => {
    const toastId = toast.loading("更新評論中")
    const textarea = document.querySelector("#comment") as HTMLTextAreaElement
    const res = await fetch(`/api/review`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: comment.id, courseId: comment.courseId, comment: textarea.value })
    })

    const result = await res.json()

    if (!res.ok) {
      toast.error(`更新評論失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      setIsEditing(false)
      toast.success("更新評論成功", { id: toastId })
      queryClient.invalidateQueries({ queryKey: ["course", comment.courseId] })
      queryClient.invalidateQueries({ queryKey: ["comments", comment.courseId] })
    }
  }

  const onDelete = async () => {
    const toastId = toast.loading("刪除評論中")
    const res = await fetch(`/api/review`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: comment.id })
    })

    const result = await res.json()

    if (!res.ok) {
      toast.error(`刪除評論失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      toast.success("刪除評論成功", { id: toastId })
      queryClient.invalidateQueries({ queryKey: ["course", comment.courseId] })
      queryClient.invalidateQueries({ queryKey: ["comments", comment.courseId] })
    }
  }

  return (
    <Dialog>
      <li>
        <DialogTrigger className='w-full'>
          <motion.div
            className='flex flex-col rounded-2xl bg-white p-4 shadow'
            whileHover={{ scale: 1.05 }}
          >
            <div className='line-clamp-1 flex items-center text-left text-sm text-gray-500'>
              {comment.username}
            </div>
            <div className='flex items-center justify-between gap-2'>
              <div className='flex items-center gap-4'>
                <motion.div
                  className='w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2'
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconSpy />
                </motion.div>
                {/* 強迫換行 */}
                {/* 從右邊到左邊 */}
                <motion.div
                  className='line-clamp-2 break-all text-left'
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {comment.comment}
                </motion.div>
              </div>
              <motion.div
                className='flex flex-col items-end gap-2'
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className='flex items-center gap-2'>
                  <IconStar className='fill-amber-500 text-amber-500' />
                  <span className='text-amber-500'>{comment.rating}</span>
                </div>
                <div className='text-nowrap text-sm text-gray-500'>
                  {formatDatetime(comment.updatedAt)}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </DialogTrigger>
      </li>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>評論</DialogTitle>
          <DialogDescription asChild>
            <div className='relative'>
              評論時間：{new Date(comment.createdAt).toLocaleString()}
              <br />
              編輯時間：{new Date(comment.updatedAt).toLocaleString()}
              {comment.userId === user?.id && (
                <DropdownMenu modal={modal}>
                  <div className='sm:flex sm:items-center sm:justify-between'>
                    <div className='absolute bottom-0 left-0 flex items-center justify-end gap-2 sm:static'>
                      <IconStar className='fill-amber-500 text-amber-500' />
                      <span className='text-amber-500'>{comment.rating}</span>
                    </div>

                    <DropdownMenuTrigger asChild>
                      <div className='absolute -bottom-1 right-0 rounded-md p-1 hover:bg-amber-500 hover:text-white sm:static'>
                        <IconEdit />
                      </div>
                    </DropdownMenuTrigger>
                  </div>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuItem
                      className='flex items-center gap-2'
                      onClick={() => {
                        setIsEditing(true)
                        setModal(false)
                      }}
                    >
                      <IconPencil />
                      編輯
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex items-center gap-2' onClick={onDelete}>
                      <IconTrash />
                      刪除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Textarea
            className='h-[50vh] text-base text-black'
            readOnly={!isEditing}
            id='comment'
            defaultValue={comment.comment}
          />
          {isEditing && comment.userId === user.id && (
            <div className='flex justify-end'>
              <Button onClick={onSubmit}>送出</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Comment
