import React from "react"

import { site } from "@/config/site"
import { getCurrentUser } from "@/lib/get-current-user"

import CommentList from "./comment-list"
import Course from "./course"
import NewCommentButton from "./new-comment-button"

const getCourse = async (courseId: string) => {
  const res = await fetch(`${site.url}/api/course/?course=${courseId}`, {
    method: "GET"
  })
  const data = await res.json()
  return data.course
}

const TeacherCoursePage = async ({ params }: { params: { courseId: string } }) => {
  const user = await getCurrentUser()
  const course = await getCourse(params.courseId)

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
