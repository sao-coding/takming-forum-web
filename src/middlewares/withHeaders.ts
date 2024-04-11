// middlewares/withHeaders.ts
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server"

import { MiddlewareFactory } from "./types"
export const withHeaders: MiddlewareFactory = (next: NextMiddleware) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    // /api/post 允許跨域請求
    // console.log("request", request.ip)
    const res = await next(request, _next)
    if (res) {
      res.headers.set("X-Content-Type-Options", "nosniff")
      res.headers.set("X-DNS-Prefetch-Control", "off")
      res.headers.set("X-Frame-Options", "SAMEORIGIN")
      res.headers.set("X-Permitted-Cross-Domain-Policies", "none")
      res.headers.set("X-XSS-Protection", "1; mode=block")
      res.headers.set("X-Download-Options", "noopen")
      res.headers.set("Set-Cookie", "Secure")
      res.headers.set("X-URL", request.url)
      res.headers.set("X-Forwarded-For", request.headers.get("X-Forwarded-For") || "0.0.0.0")
      res.headers.set("X-Real-IP", request.headers.get("X-Real-IP") || "0.0.0.0")
      // if (request.nextUrl.pathname.startsWith("/api/post")) {
      //   res.headers.set("Access-Control-Allow-Origin", "*")
      //   res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS")
      //   res.headers.set("Access-Control-Allow-Headers", "Content-Type")
      // }
    }
    return res
  }
}
