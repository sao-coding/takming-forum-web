import { z } from "zod"

// 賣二手書表單的資料格式

// 選擇書本分類 <option>財金學院</option><option>管理學院</option><option>資訊學院</option><option>共同科目</option><option>其他</option><option>贈送二手書</option>

// 選擇交書方式 (1)面交 (2)郵寄  (3)其他
// 書名
// 作者
// 出版社
// ISBN
// 價格
// 書本簡介

export const bookSchema = z.object({
  // 選擇書本分類
  // category: z.enum(["財金學院", "管理學院", "資訊學院", "共同科目", "其他", "贈送二手書"]),
  // 若 require error message 請選擇書本分類
  category: z.enum(["財金學院", "管理學院", "資訊學院", "共同科目", "其他", "贈送二手書"], {
    required_error: "請選擇書本分類"
  }),
  // 選擇交書方式
  deliveryMethod: z.enum(["面交", "郵寄", "面交/郵寄", "其他"], {
    required_error: "請選擇交書方式"
  }),

  // cover url
  cover: z.string().url({ message: "封面圖片網址格式錯誤" }).optional().or(z.literal("")), // optional() or z.literal("")

  // 書名 請輸入書名
  title: z.string().min(1, { message: "請輸入書名" }).max(255, { message: "書名最多 255 字" }),

  // 作者
  author: z.string().min(1, { message: "請輸入作者" }).max(100, { message: "作者最多 100 字" }),

  // 出版社 不一定要填
  publisher: z.string().max(100, { message: "出版社最多 100 字" }).optional(),

  // ISBN
  isbn: z.string().max(100, { message: "ISBN 最多 100 字" }).optional(),

  // 價格 必填，價格必須介於 1 到 10000 之間
  price: z.coerce
    .number()
    .int({ message: "價格必須是整數" })
    .nonnegative({ message: "價格必須是正數" })
    .min(1, { message: "價格必須介於 1 到 10000 之間" })
    .max(10000, { message: "價格必須介於 1 到 10000 之間" })

  // // 書本簡介
  // description: z.string().min(1).max(2000)
})
