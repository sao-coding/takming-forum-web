import { NextRequest } from "next/server"
// <html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
// <div style='text-align: center; margin-top: 100px;'><h1>德明論壇 API</h1><p>請使用 /api 進行存取</p></div>

export const GET = async (req: NextRequest) => {
  // 顯示 html
  return new Response(
    `<!DOCTYPE html><html lang="zh-Hant-TW"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>德明論壇 API</title><style>body { font-family: 'Noto Sans TC', sans-serif; }</style></head><body><div style='text-align: center; margin-top: 100px;'><h1>德明論壇 API</h1><p>請使用 /api 進行存取</p></div></body></html>`,
    {
      headers: {
        "content-type": "text/html"
      }
    }
  )
}
