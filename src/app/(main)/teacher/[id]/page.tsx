import React from "react"
import { cookies } from "next/headers"

import { site } from "@/config/site"
import { TeacherInfo } from "@/types"

import CourseList from "./course-list"
import LoadingCourse from "./loading-course"
import LoadingTeacher from "./loading-teacher"
import NewCourseButton from "./new-course-button"
import Teacher from "./teacher"

const getTeacher = async (id: string) => {
  const res = await fetch(`${site.url}/api/teacher?id=${id}`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString()
    }
  })
  const data = await res.json()
  return data.teacher
}

const TeacherInfoPage = async ({ params }: { params: { id: string } }) => {
  console.log("teacher: ", params.id)
  const teacher: TeacherInfo = await getTeacher(params.id)

  //
  // const { data: teacher, isLoading: isLoadingTeacher } = useQuery<TeacherInfoType>({
  //   queryKey: ["teacher", params.id],
  //   queryFn: async () => {
  //     const res = await fetch(`/api/teacher/${params.id}`, {
  //       method: "GET",
  //       headers: {
  //
  //       }
  //     })
  //     const data = await res.json()
  //     return data.teacher
  //   }
  // })

  return (
    <div className='flex flex-col gap-4'>
      {/* 教師課程 */}
      <div className='flex h-10 items-center justify-between'>
        <h1 className='text-2xl font-bold'>教師課程</h1>
        {teacher && <NewCourseButton teacher={teacher} />}
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <React.Suspense fallback={<LoadingTeacher />}>
          <Teacher id={params.id} />
        </React.Suspense>

        <ul className='flex flex-1 flex-col gap-4'>
          {/* {isLoadingCourses && Array.from({ length: 6 }).map((_, i) => <LoadingCourse key={i} />)}
          {courses && courses.map((course) => <Card key={course.id} course={course} />)} */}
          <React.Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <LoadingCourse key={i} />
            ))}
          >
            <CourseList id={params.id} />
          </React.Suspense>
        </ul>
      </div>
    </div>
  )
}

export default TeacherInfoPage
