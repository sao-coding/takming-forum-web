// model Teacher {
//     id        String   @id @default(cuid())
//     teacherId String   @unique
//     name      String
//     picture   String?
//     email     String?
//     // 學歷
//     education String?
//     // 專業領域
//     expertise String?
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     Course    Course[]
//   }
import { z } from "zod"

// 老師的資料格式
export const teacherSchema = z.object({
  // 老師 id
  // id 格式 0001004 三個0 + 4 位數字 errorMessages: required"老師 id 是必填欄位"
  teacherId: z
    .string()
    .refine((id) => id.match(/^000\d{4}$/), {
      message: "老師 id 格式錯誤"
    })
    .optional()
    .or(z.literal("")), // optional() or z.literal("")

  // 老師姓名
  name: z.string().min(1, { message: "老師姓名是必填欄位" }),

  // 老師照片
  picture: z.string().url({ message: "照片網址格式錯誤" }).optional().or(z.literal("")), // optional() or z.literal("")

  // 老師 email
  email: z.string().email({ message: "email 格式錯誤" }).optional().or(z.literal("")),
  // .email({ message: "email 格式錯誤" }).optional().or(z.literal("")), // optional() or z.literal("")

  // 學歷
  education: z.string().max(100).optional(),

  // 專業領域
  expertise: z.string().max(100).optional()
})
