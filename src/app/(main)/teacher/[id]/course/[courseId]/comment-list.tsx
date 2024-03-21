"use client"

import { Session } from "next-auth"

import { Review } from "@/types"
import { useQuery } from "@tanstack/react-query"

import Comment from "./comment"

const CommentList = ({ user, courseId }: { user: Session["user"]; courseId: string }) => {
  const { data: comments } = useQuery<Review[]>({
    queryKey: ["comments", courseId],
    queryFn: async () => {
      const res = await fetch(`/api/review?course=${courseId}`, {
        method: "GET"
      })
      const data = await res.json()
      return data.comments
    }
  })

  return (
    <ul className='flex flex-col gap-4 pb-20'>
      {comments &&
        comments.map((comment) => <Comment key={comment.id} user={user} comment={comment} />)}
    </ul>
  )
}

export default CommentList
