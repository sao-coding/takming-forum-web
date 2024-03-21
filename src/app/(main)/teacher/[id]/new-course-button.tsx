"use client"

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
import { Input } from "@/components/ui/input"
import { TeacherInfo } from "@/types"

const NewCourseButton = ({ teacher }: { teacher: TeacherInfo }) => {
  const onSubmit = async () => {
    // 選擇 id 為 course-name 的 input 元素，並取得其值
    // const courseId = document.querySelector<HTMLInputElement>("#course-id")?.value
    const courseName = document.querySelector<HTMLInputElement>("#course-name")?.value

    const toastId = toast.loading("新增課程中")

    if (!courseName) {
      toast.error("請填寫課程 ID 與名稱", { id: toastId })
      return
    }

    const res = await fetch(`/api/course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: courseName, teacherId: teacher.id })
    })

    const result = await res.json()

    if (!res.ok) {
      toast.error(`新增課程失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      toast.success("新增課程成功", { id: toastId })
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className='rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          新增課程
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增課程</DialogTitle>
          <DialogDescription>
            請填寫課程資訊
            <br />
            <span className='text-red-500'>非管理員無法新增課程</span>
            <a
              href='https://forms.gle/QQycyiD9SXBmXTGXA'
              className='ml-1 rounded px-1 hover:bg-blue-100'
            >
              按這裡申請
            </a>
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <div>
            教師 ID: <span className='rounded-md bg-muted px-2 py-1 font-mono'>{teacher.id}</span>
          </div>
          <div>
            教師姓名: <span className='rounded-md bg-muted px-2 py-1'>{teacher.name}</span>
          </div>
        </div>
        {/* <Input id='course-id' placeholder='課程 ID' /> */}
        <Input id='course-name' placeholder='課程名稱' />
        <Button onClick={onSubmit}>新增</Button>
      </DialogContent>
    </Dialog>
  )
}

export default NewCourseButton
