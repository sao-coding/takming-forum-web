"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import Editor from "@/components/editor"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { bookSchema } from "@/schemas/second-hand-book"
import { zodResolver } from "@hookform/resolvers/zod"
import { JSONContent } from "@tiptap/react"

type EditorBook = z.infer<typeof bookSchema> & {
  id: string
  content: JSONContent
}

const EditForm = ({ post }: { post: EditorBook | null }) => {
  const id = post?.id
  const [data, setData] = React.useState<EditorBook | null>(null)
  const [content, setContent] = React.useState<JSONContent>(
    post?.content || {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "書本簡介" }]
        },
        { type: "paragraph" }
      ]
    }
  )

  const router = useRouter()

  const form = useForm<z.infer<typeof bookSchema>>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      category: undefined,
      deliveryMethod: undefined,
      cover: "",
      title: "",
      author: "",
      publisher: "",
      isbn: "",
      price: 100
    }
  })

  React.useEffect(() => {
    if (post) {
      setData(post)
    }
  }, [post])

  React.useEffect(() => {
    if (data) {
      form.reset({
        category: data.category,
        deliveryMethod: data.deliveryMethod,
        cover: data.cover,
        title: data.title,
        author: data.author,
        publisher: data.publisher,
        isbn: data.isbn,
        price: data.price
      })
      console.log("data.content", data.content)
      setContent(data.content)
    }
  }, [data, form])

  React.useEffect(() => {
    console.log("content", content)
  }, [content])

  const onSubmit = async (data: z.infer<typeof bookSchema>) => {
    // token 在 Cookie 中，所以要在 Header 中帶上

    if (id) {
      const toastId = toast.loading("更新書本中")
      const res = await fetch(`/api/book?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, ...data, content })
      })

      if (res.ok) {
        toast.success("更新書本成功", { id: toastId })
        router.push("/book")
      } else {
        toast.error("更新書本失敗", { id: toastId })
      }
    } else {
      const toastId = toast.loading("發布書本中")
      const res = await fetch(`/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...data, content })
      })

      if (res.ok) {
        toast.success("發布書本成功", { id: toastId })
        router.push("/book")
      } else {
        toast.error("發布書本失敗", { id: toastId })
      }
    }
  }

  // 書本新舊狀況：
  const bookCategories = ["財金學院", "管理學院", "資訊學院", "共同科目", "其他", "贈送二手書"]

  // 交書方式：(1)面交 (2)郵寄 (3)其他
  const bookDeliveryMethods = ["面交", "郵寄", "面交/郵寄", "其他"]

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='flex w-full items-center justify-between gap-4'>
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='選擇書本分類' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>書本分類</SelectLabel>
                        {bookCategories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className='hover:bg-slate-100'
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='deliveryMethod'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder='選擇交書方式' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>交書方式</SelectLabel>
                        {bookDeliveryMethods.map((method) => (
                          <SelectItem key={method} value={method} className='hover:bg-slate-100'>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* coverurl */}
          <FormField
            control={form.control}
            name='cover'
            render={({ field }) => (
              <FormItem className='w-full'>
                <Input {...field} placeholder='封面網址 (選填)' />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <Input {...field} placeholder='書名' />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='author'
          render={({ field }) => (
            <FormItem>
              <Input {...field} placeholder='作者' />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='publisher'
          render={({ field }) => (
            <FormItem>
              <Input {...field} placeholder='出版社 (選填)' />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='isbn'
          render={({ field }) => (
            <FormItem>
              <Input {...field} placeholder='ISBN (選填)' />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <Input {...field} type='number' placeholder='價格' />
              <FormMessage />
            </FormItem>
          )}
        />
        <Editor
          options={{ content }}
          onChange={(editor) => {
            setContent(editor.getJSON() as JSONContent)
          }}
        />
        <Button
          type='submit'
          variant='default'
          className='bg-gradient-to-r from-orange-500 to-amber-500 text-white'
        >
          送出
        </Button>
      </form>
    </Form>
  )
}

export default EditForm
