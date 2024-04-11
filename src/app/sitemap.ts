import { MetadataRoute } from "next"

import { site } from "@/config/site"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 所有文章ID
  const posts = await prisma.post.findMany({
    select: {
      id: true
    }
  })
  // 所有課程ID
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      teacherId: true
    }
  })
  // 所有老師ID
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true
    }
  })
  // 所有書籍ID
  const books = await prisma.book.findMany({
    select: {
      id: true
    }
  })
  //   生成所有文章的URL
  const postUrls: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `/post/${post.id}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    }
  })
  //   生成所有課程的URL /teacher/:teacherId/course/:courseId
  const courseUrls: MetadataRoute.Sitemap = courses.map((course) => {
    return {
      url: `/teacher/${course.teacherId}/course/${course.id}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    }
  })
  //   生成所有老師的URL
  const teacherUrls: MetadataRoute.Sitemap = teachers.map((teacher) => {
    return {
      url: `/teacher/${teacher.id}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    }
  })
  //   生成所有書籍的URL
  const bookUrls: MetadataRoute.Sitemap = books.map((book) => {
    return {
      url: `/book/${book.id}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    }
  })

  // 所有URL的清單
  const urls: MetadataRoute.Sitemap = [
    {
      url: "/",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1
    },
    {
      url: "/course",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    },
    {
      url: "/teacher",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    },
    {
      url: "/book",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.8
    },
    {
      url: "/rank",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5
    },
    {
      url: "/user",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 0.5
    },
    ...postUrls,
    ...courseUrls,
    ...teacherUrls,
    ...bookUrls
  ]

  //   所有URL的清單 加上 site.url
  urls.forEach((url) => {
    url.url = site.url + url.url
  })

  return urls
}
