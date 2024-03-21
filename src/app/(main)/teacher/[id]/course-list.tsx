import { cookies } from "next/headers"

import { site } from "@/config/site"
import { Course } from "@/types"

import Card from "./card"

const getCourses = async (teacherId: string) => {
  const res = await fetch(`${site.url}/api/course?teacher=${teacherId}`, {
    method: "GET",
    headers: {
      Cookie: cookies().toString()
    }
  })
  const data = await res.json()
  return data.courses
}

const CourseList = async ({ id }: { id: string }) => {
  const courses: Course[] = await getCourses(id)
  return courses.map((course) => <Card key={course.id} course={course} />)
}

export default CourseList
