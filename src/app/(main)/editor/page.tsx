"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Cookies from "js-cookie"
import { toast } from "sonner"

import Editor from "@/components/editor"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import Img from "@/components/ui/img"
import { useMediaQuery } from "@/hooks/use-media-query"
import { User } from "@/types"
import { IconCaretDown, IconSpy, IconUser } from "@tabler/icons-react"
import { JSONContent } from "@tiptap/react"

const List = ({
  setOpen,
  setAnonymous
}: {
  setOpen: (open: boolean) => void
  setAnonymous: (anonymous: boolean) => void
}) => {
  return (
    <ul className='flex flex-col gap-4'>
      <li>
        <button
          className='flex w-full items-center gap-2'
          onClick={() => {
            setAnonymous(true)
            setOpen(false)
          }}
        >
          <div className='w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2'>
            <IconSpy />
          </div>
          匿名
        </button>
      </li>
      {/* <li>
        <button
          className='flex w-full items-center gap-2'
          onClick={() => {
            setAnonymous(false)
            setOpen(false)
          }}
        >
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <Img
              src={user.picture}
              alt={user.name}
              fallback={
                <div className='flex h-96 w-full items-center justify-center bg-gray-200'>
                  <p>loading...</p>
                </div>
              }
            />
          </div>
          {user.studentId}
        </button>
      </li> */}
    </ul>
  )
}

const PostEditorPage = () => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [anonymous, setAnonymous] = React.useState(true)
  const [time, setTime] = React.useState<Date | null>(null)
  const [title, setTitle] = React.useState("")
  const [content, setContent] = React.useState<string | JSONContent>("")
  const [isEmpty, setIsEmpty] = React.useState(true)
  const router = useRouter()

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const user: User = JSON.parse(Cookies.get("user") || "{}")

  const onSubmit = async () => {
    if (title.trim() === "") {
      toast.error("標題不得為空")
      return
    }

    if (isEmpty) {
      toast.error("內容不得為空")
      return
    }

    const toastId = toast.loading("發文中")

    const res = await fetch(`/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, content, anonymous })
    })

    if (res.ok) {
      toast.success("發文成功", { id: toastId })
      router.push("/")
    } else {
      toast.error("發文失敗", { id: toastId })
    }
  }

  return (
    <div className='flex flex-col gap-4 pb-20'>
      <div className='flex items-center gap-1'>
        {anonymous ? (
          <div className='w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2'>
            <IconSpy />
          </div>
        ) : (
          <div className='h-10 w-10 overflow-hidden rounded-full'>
            <Img src={user.picture} alt={user.name} fallback={<IconUser size={32} />} />
          </div>
        )}
        {/* 選擇發文身分 */}
        {/* 匿名 */}
        <div className=''>
          {isDesktop ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className='flex items-center'>
                {/* 選擇發文身分 */}
                {anonymous ? "匿名" : user.studentId}
                <IconCaretDown className='fill-gray-500 stroke-gray-500' />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>選擇發文身分</DialogTitle>
                </DialogHeader>
                <List setOpen={setOpen} setAnonymous={setAnonymous} />
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger className='flex items-center'>
                選擇發文身分
                <IconCaretDown className='fill-gray-500 stroke-gray-500' />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>選擇發文身分</DrawerTitle>
                </DrawerHeader>
                <div className='px-4'>
                  <List setOpen={setOpen} setAnonymous={setAnonymous} />
                </div>
                <DrawerFooter>
                  <DrawerClose>關閉</DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
          {/* xxxx 年 xx 月 xx 日 下午 xx:xx */}
          <div className='text-sm text-gray-500'>{time?.toLocaleString("zh-TW")}</div>
        </div>
      </div>
      <input
        type='text'
        className='bg-transparent text-3xl focus:outline-none'
        placeholder='輸入標題'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Editor
        options={{ content }}
        onChange={(editor) => {
          if (editor.getText().trim() === "") {
            setIsEmpty(true)
          } else {
            setIsEmpty(false)
          }
          setContent(editor.getJSON() as JSONContent)
        }}
      />
      <div className='fixed bottom-0 right-0 p-4 xl:right-96'>
        <motion.button
          className='h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSubmit}
        >
          發文
        </motion.button>
      </div>
    </div>
  )
}

export default PostEditorPage
