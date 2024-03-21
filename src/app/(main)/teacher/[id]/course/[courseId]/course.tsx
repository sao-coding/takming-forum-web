"use client"

import Link from "next/link"

import { CourseInfo } from "@/types"
import { IconSchool } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"

import Loading from "./loading"
import RatingShow from "./rating-show"

const Course = ({ courseId }: { courseId: string }) => {
  const { data: course, isLoading } = useQuery<CourseInfo>({
    queryKey: ["course", courseId],
    queryFn: async () => {
      const res = await fetch(`/api/course/?course=${courseId}`, {
        method: "GET"
      })
      const data = await res.json()
      return data.course
    }
  })
  return (
    <>
      {isLoading && <Loading />}
      {course && (
        <div className='flex flex-col items-center gap-4 rounded-2xl bg-white p-4 shadow'>
          <h1 className='text-2xl font-bold'>{course.name}</h1>
          <Link href={`/teacher/${course.teacherId}`} className='flex items-center gap-1'>
            <IconSchool />
            <span className='rounded-md bg-muted px-2 hover:bg-blue-100'>
              {course.teacher.name}
            </span>
          </Link>
          <RatingShow averageRating={course.averageRating} />
        </div>
      )}
    </>
  )
}

export default Course
