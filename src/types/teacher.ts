// "teacher": {
//   "id": "clteigzc4006g11q24b5ddjrd",
//   "name": "英宗宏",
//   "picture": "https://ba.takming.edu.tw/var/file/27/1027/img/231/108451332.gif",
//   "email": "ericying",
//   "education": null,
//   "expertise": null,
//   "totalRating": 2,
//   "averageRating": "1.9"
// }

export type Teacher = {
  id: number
  name: string
  picture: string
}

export type TeacherInfo = Teacher & {
  email: string
  education: string
  expertise: string
  totalRating: number
  averageRating: string
}
