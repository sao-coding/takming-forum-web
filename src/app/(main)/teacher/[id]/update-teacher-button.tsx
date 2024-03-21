"use client"

import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { teacherSchema } from "@/schemas/teacher"
import { TeacherInfo } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconSettings } from "@tabler/icons-react"

const UpdateTeacherButton = ({ teacher }: { teacher: TeacherInfo }) => {
  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      teacherId: "",
      name: teacher.name,
      picture: teacher.picture || "",
      email: teacher.email || "",
      education: teacher.education || "",
      expertise: teacher.expertise || ""
    }
  })

  const onSubmit = async (data: z.infer<typeof teacherSchema>) => {
    console.log(data)

    const toastId = toast.loading("更新老師中")
    const updateData = {
      id: teacher.id,
      name: data.name,
      picture: data.picture,
      email: data.email,
      education: data.education,
      expertise: data.expertise
    }
    const res = await fetch(`/api/teacher`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateData)
    })
    const result = await res.json()

    if (!res.ok) {
      toast.error(`更新老師失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      toast.success("更新老師成功", { id: toastId })
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <IconSettings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>更新老師資訊</DialogTitle>
          <DialogDescription>
            請填寫老師資訊
            <br />
            <span className='text-red-500'>非管理員無法更新老師資訊</span>
            <a
              href='https://forms.gle/QQycyiD9SXBmXTGXA'
              className='ml-1 rounded px-1 hover:bg-blue-100'
            >
              按這裡申請
            </a>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name='teacherId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>教師 ID</FormLabel>
                  <FormControl>
                    <Input placeholder='老師 ID' {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>教師姓名</FormLabel>
                  <FormControl>
                    <Input placeholder='老師姓名' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='picture'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>老師照片</FormLabel>
                  <FormControl>
                    <Input placeholder='老師照片' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>老師 email</FormLabel>
                  <FormControl>
                    <Input placeholder='老師 email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='education'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>學歷</FormLabel>
                  <FormControl>
                    <Input placeholder='學歷' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='expertise'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>專業領域</FormLabel>
                  <FormControl>
                    <Input placeholder='專業領域' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit'>更新老師資訊</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTeacherButton
