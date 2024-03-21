import Editor from "@/components/editor"
import Img from "@/components/ui/img"
import { Textarea } from "@/components/ui/textarea"
import { site } from "@/config/site"
import { Post } from "@/types"
import { IconSpy, IconUser } from "@tabler/icons-react"

const getPost = async (id: string) => {
  const res = await fetch(`${site.url}/api/post/?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  const data = await res.json()
  return data.post
}

const PostPage = async ({ params }: { params: { id: string } }) => {
  // const { data: post, isLoading } = useQuery<Post>({
  //   queryKey: ["post", params.id],
  //   queryFn: async () => {
  //     const res = await fetch(`/api/post?id=${params.id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     const data = await res.json()
  //     return data.post
  //   }
  // })
  const post: Post = await getPost(params.id)
  return (
    <div>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-2xl font-bold sm:text-3xl'>{post?.title}</h1>
          <div className='flex items-center gap-1'>
            {post?.anonymous ? (
              <div className='w-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 p-2'>
                <IconSpy />
              </div>
            ) : (
              <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full'>
                <Img
                  src={post?.user?.picture || ""}
                  alt={post?.user?.name || ""}
                  className='h-full w-full object-cover'
                  fallback={<IconUser size={32} />}
                />
              </div>
            )}
            <div>{post?.user?.name || "匿名"}</div>
          </div>
        </div>
        <Editor options={{ editable: false, content: post?.content }} />
        {/* 留言 */}
        <h2 className='text-xl font-bold'>留言(施工中)</h2>
        <Textarea />
      </div>
    </div>
  )
}

export default PostPage
