import { motion } from "framer-motion"
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
import { zodResolver } from "@hookform/resolvers/zod"

const NewTeacherButton = () => {
  const form = useForm<z.infer<typeof teacherSchema>>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      teacherId: "",
      name: "",
      picture: "",
      email: "",
      education: "",
      expertise: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof teacherSchema>) => {
    const toastId = toast.loading("新增老師中")
    const res = await fetch(`/api/teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()

    if (!res.ok) {
      toast.error(`新增老師失敗: ${result.msg}，請連絡管理員`, { id: toastId })
    } else {
      toast.success("新增老師成功", { id: toastId })
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
          新增老師
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新增老師</DialogTitle>
          {/* 請填寫老師資訊 非管理員無法新增老師 */}
          <DialogDescription>
            請填寫老師資訊
            <br />
            <span className='text-red-500'>非管理員無法新增老師</span>
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
                    <Input placeholder='老師 ID' {...field} />
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
            <Button type='submit'>新增老師</Button>
            {/* <Input placeholder='老師姓名' />
            <Input placeholder='老師照片' />
            <Input placeholder='老師email' />
            <Input placeholder='學歷' />
            <Input placeholder='專業領域' /> */}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default NewTeacherButton
