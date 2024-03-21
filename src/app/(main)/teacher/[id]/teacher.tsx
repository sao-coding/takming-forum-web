import { cookies } from "next/headers"

import Fancybox from "@/components/ui/fancybox"
import Img from "@/components/ui/img"
import { site } from "@/config/site"
import { IconMail, IconStarFilled } from "@tabler/icons-react"

import UpdateTeacherButton from "./update-teacher-button"

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

const Teacher = async ({ id }: { id: string }) => {
  const teacher = await getTeacher(id)

  return (
    <div>
      <div className='sticky top-20 flex w-full flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow md:w-64'>
        <Fancybox
          options={{
            Carousel: {
              infinite: false
            }
          }}
        >
          <a href={teacher.picture} data-fancybox data-caption={teacher.name}>
            <div className='relative aspect-square w-36 overflow-hidden rounded-full border sm:w-40 md:w-48'>
              <Img
                src={teacher.picture || "https://x"}
                alt={teacher.name}
                className='absolute top-0 h-full w-full rounded-xl object-cover object-top transition-transform duration-300 hover:scale-105'
                fallback={
                  <div className='flex h-full w-full items-center justify-center bg-gray-300'>
                    <div className='text-5xl font-bold text-white'>
                      {/* 只顯示姓名 */}
                      {teacher.name.split("")[0]}
                    </div>
                  </div>
                }
              />
            </div>
          </a>
        </Fancybox>

        <h3 className='text-lg font-bold'>{teacher.name}</h3>
        {/* email */}
        <div className='flex items-center gap-1'>
          <IconMail />
          {teacher.email.split("@")[0] && (
            <a href={`mailto:${teacher.email}`} className='rounded-md px-2 py-1 hover:bg-muted'>
              {teacher.email.split("@")[0]}
            </a>
          )}
        </div>
        <div className='flex items-center gap-1'>
          <IconStarFilled className='text-amber-500' />
          <span className='text-amber-500'>{teacher.averageRating}</span>
          <span className='text-muted-foreground'>（{teacher.totalRating}則評論）</span>
        </div>
        <div className='absolute right-0 top-0 p-2'>
          <UpdateTeacherButton teacher={teacher} />
        </div>
      </div>
    </div>
  )
}

export default Teacher
