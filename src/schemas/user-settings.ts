import { z } from "zod"

// 使用者設定的資料格式

// 是否開啟 line notify 通知

// email
// phone
// line-id
// ig-id

export const userSettingsSchema = z.object({
  // 是否開啟 line notify 通知
  lineNotifyStatus: z.boolean(),

  username: z.string().max(20, { message: "使用者名稱最多 20 個字" }),

  // email
  email: z.string().email().max(100),

  // phone
  phone: z.string().max(20).optional(),

  // line-id
  lineId: z.string().max(100).optional(),

  // ig-id
  igId: z.string().max(100).optional()
})
