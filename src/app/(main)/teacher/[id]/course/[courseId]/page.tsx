import React from "react"

import { getCurrentUser } from "@/lib/get-current-user"

import CommentList from "./comment-list"
import Course from "./course"
import NewCommentButton from "./new-comment-button"

const TeacherCoursePage = async ({ params }: { params: { courseId: string } }) => {
  const user = await getCurrentUser()

  return (
    <div className='flex flex-col gap-4'>
      <Course courseId={params.courseId} />
      {params.courseId && <NewCommentButton courseId={params.courseId} />}

      <h2 className='text-2xl font-bold'>評論</h2>
      <CommentList user={user} courseId={params.courseId} />
    </div>
  )
}

export default TeacherCoursePage
