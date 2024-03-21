import Link from "next/link"

import { CourseInfo } from "@/types"
import { IconStarFilled } from "@tabler/icons-react"

const Card = ({ course }: { course: CourseInfo }) => {
  return (
    <Link
      href={`/teacher/${course.teacherId}/course/${course.id}`}
      className='flex flex-col rounded-2xl bg-white p-4 shadow hover:bg-muted'
    >
      <h2 className='line-clamp-1 text-xl font-bold'>{course.name}</h2>
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-muted-foreground'>{course.teacher.name}</span>
          <span className='text-muted-foreground'>（{course.totalRating}則評論）</span>
        </div>
        <div className='flex w-14 items-center justify-between'>
          <IconStarFilled className='text-amber-500' />
          <span>{course.averageRating}</span>
        </div>
      </div>
    </Link>
  )
}

export default Card
