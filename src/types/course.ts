// {
//   "id": "cltetj97j0001aoxn1yzj2exi",
//   "courseId": "123",
//   "name": "程式設計",
//   "teacherId": "clteigzc4006g11q24b5ddjrd",
//   "totalRating": 11,
//   "averageRating": "2.8"
// }

export type Course = {
  id: string
  courseId: string
  name: string
  teacherId: string
  totalRating: number
  averageRating: string
}

export type CourseInfo = Course & {
  teacher: {
    name: string
  }
}
