import React from "react"
import Link from "next/link"

import Editor from "@/components/editor"
import Fancybox from "@/components/ui/fancybox"
import Img from "@/components/ui/img"
import { site } from "@/config/site"
import { getCurrentUser } from "@/lib/get-current-user"
import {
  IconBuilding,
  IconCalendarEvent,
  IconCoin,
  IconEdit,
  IconPhotoOff,
  IconUser,
  IconUserShare
} from "@tabler/icons-react"

import BookStatusButton from "./book-status-button"
import DeleteButton from "./delete-button"
import LineNotifyButton from "./line-notify-button"
// import { JSONContent } from "@tiptap/react"

const getPost = async (id: string) => {
  const res = await fetch(`${site.url}/api/book?id=${id}`)
  const data = await res.json()
  return data.book
}

const SecondHandBookPostsPage = async ({ params }: { params: { id: string } }) => {
  // const [bookStatus, setBookStatus] = React.useState("")
  // const router = useRouter()

  const user = await getCurrentUser()
  // const { data: post, isLoading } = useQuery<BookPost>({
  //   queryKey: ["posts", params.id],
  //   queryFn: async () => {
  //     const res = await fetch(`/api/book?id=${params.id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //
  //       }
  //     })
  //     const data = await res.json()
  //     return data.book
  //   },
  //   enabled: !!params.id
  // })

  const post = await getPost(params.id)

  return (
    <div className='relative'>
      <>
        {post && (
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <Fancybox
                options={{
                  Carousel: {
                    infinite: false
                  }
                }}
              >
                <a href={post.cover} data-fancybox data-caption={post.title}>
                  <div className='relative aspect-[2/3] w-36 overflow-hidden rounded-xl border sm:w-40 md:w-48'>
                    <Img
                      src={post.cover || ""}
                      alt={post.title}
                      className='absolute top-0 h-full w-full rounded-xl object-cover transition-transform duration-300 hover:scale-105'
                      fallback={
                        <div className='flex h-full w-full items-center justify-center bg-gray-300'>
                          <IconPhotoOff size={40} />
                        </div>
                      }
                    />
                  </div>
                </a>
              </Fancybox>
              <div className='flex flex-1 flex-col gap-4'>
                <h1 className='line-clamp-2 text-3xl font-bold'>{post.title}</h1>
                <div className='flex items-center gap-1'>
                  <IconUser />
                  <span className='line-clamp-1'>{post.author}</span>
                </div>

                <div className='flex items-center gap-1'>
                  <IconBuilding />
                  <span className='line-clamp-1'>{post.publisher}</span>
                </div>
                <div className='flex w-full items-center'>
                  {post.sold && (
                    <div className='flex items-center gap-1'>
                      <span className='rounded-md bg-red-500 px-2 py-1 text-white'>已售出</span>
                    </div>
                  )}
                  <div className='ml-auto flex items-center gap-1'>
                    {user?.studentId === post.user.studentId && (
                      <>
                        <Link href={`/second-hand-book/editor/${post.id}`}>
                          <IconEdit className='hover:animate-tada' />
                        </Link>
                        <DeleteButton id={post.id} />
                        {/* 設定是否已售出 */}
                        <BookStatusButton id={post.id} />
                      </>
                    )}
                  </div>
                </div>

                <div className='absolute left-0 top-60 flex w-full flex-col gap-4 sm:static'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <span>ISBN:</span>
                      <span className='line-clamp-1'>{post.isbn}</span>
                    </div>
                    <div className='flex items-center gap-1'>
                      <IconCalendarEvent />
                      {/* 月 日 補0 */}
                      {new Date(post.createdAt).toLocaleDateString("zh-TW", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                      })}
                    </div>
                  </div>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <IconCoin className='text-amber-500' />
                      {post.price}
                    </div>
                    <div className='flex items-center gap-1'>
                      <IconUserShare />
                      {post.deliveryMethod}
                    </div>
                    <div className='flex items-center gap-1'>
                      <Img
                        src={post.user.picture}
                        alt={post.user.studentId}
                        className='h-8 w-8 rounded-full'
                        fallback={<IconUser size={32} />}
                      />
                      <span className='font-mono'>{post.user.studentId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='mt-20 pt-4 sm:m-0 sm:p-0'>
              <Editor options={{ editable: false, content: post.content }} />
            </div>
            <div className='flex flex-col gap-4'>
              {/* <h2 className='text-2xl font-bold'>留言</h2>
                <div className=''>
                  <Editor
                    options={{ content }}
                    onChange={(editor) => {
                      setContent(editor.getJSON() as JSONContent)
                    }}
                    className='min-h-40'
                  />
                </div> */}
              {/* 傳送聯絡方式給賣家 非賣家本人 才會顯示 */}
              {user?.studentId !== post.user.studentId && <LineNotifyButton id={post.id} />}
            </div>
          </div>
        )}
      </>
    </div>
  )
}

export default SecondHandBookPostsPage
