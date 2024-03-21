import Link from "next/link"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Img from "@/components/ui/img"
import { Post } from "@/types"
import formatDatetime from "@/utils/format-datetime"
import { IconDotsVertical, IconShare, IconSpy, IconUser } from "@tabler/icons-react"

const Card = ({ post }: { post: Post }) => {
  const onShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        text: "分享文章",
        url: `${window.location.origin}/post/${post.id}`
      })
    } else {
      toast.error("您的瀏覽器不支援分享功能")
    }
  }
  return (
    <article className='flex justify-between border-b py-4'>
      <Link href={`/post/${post.id}`} className='flex h-20 flex-1 flex-col gap-2'>
        <div className='flex items-center gap-1'>
          {post.anonymous ? (
            <div className='w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2'>
              <IconSpy />
            </div>
          ) : (
            <div className='h-10 w-10 overflow-hidden rounded-full'>
              <Img
                src={post?.user?.picture || ""}
                alt={post?.user?.name || ""}
                className='h-full w-full object-cover'
                fallback={<IconUser size={32} />}
              />
            </div>
          )}
          <p>{post?.user?.name || "匿名"}</p>
          <span>·</span>
          <span>
            {formatDatetime(post.createdAt)}
            {post.createdAt !== post.updatedAt && "編輯過"}
          </span>
        </div>
        <h2 className='text-lg font-bold'>{post.title}</h2>
      </Link>
      <div className='flex flex-col'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconDotsVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem className='flex items-center gap-2' onClick={onShare}>
              <IconShare />
              分享
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  )
}

export default Card
