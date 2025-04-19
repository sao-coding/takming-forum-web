import { NextFetchEvent, NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { MiddlewareFactory } from "./types"

export const withAuthorization: MiddlewareFactory = (next) => {
  return async (req: NextRequest, _next: NextFetchEvent) => {
    // 路由API保護清單
    // 路由頁面保護清單
    const publicRoutesAPI = [
      // {
      //   method: "*", // 代表所有方法都可以
      //   path: "/api/review"
      // }
      {
        method: "*",
        path: "/api/auth"
      },
      {
        method: "GET",
        path: "/api/og"
      },
      {
        method: "GET",
        path: "/api/post"
      },
      {
        method: "GET",
        path: "/api/course",
        searchParams: [{ key: "search", value: "*" }]
      },
      {
        method: "GET",
        path: "/api/book"
      },
      {
        method: "GET",
        path: "/api/review",
        searchParams: [
          {
            key: "type",
            value: "rank"
          }
        ]
      },
      {
        method: "*",
        path: "/api/line-bot"
      }
    ]

    const protectedRoutesPage = ["/book/posts", "/user", "/teacher", "/line-bot-link"]

    const nextAuthToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET
    })

    // console.log("path", req.nextUrl.pathname)

    if (req.nextUrl.pathname.startsWith("/api")) {
      publicRoutesAPI.forEach((route) => {
        // console.log("route", route.searchParams)
      })
      if (
        publicRoutesAPI.some(
          (route) =>
            req.nextUrl.pathname.startsWith(route.path) &&
            (route.searchParams === undefined ||
              route?.searchParams.every(
                (param) =>
                  req.nextUrl.searchParams.has(param.key) &&
                  (param.value === "*" || req.nextUrl.searchParams.get(param.key) === param.value)
              )) &&
            (route.method === "*" || route.method === req.method)
        )
      ) {
        return next(req, _next)
      } else if (!nextAuthToken) {
        return NextResponse.json(
          {
            error: "Unauthorized"
          },
          {
            status: 401
          }
        )
      }
    }

    if (protectedRoutesPage.some((route) => req.nextUrl.pathname.startsWith(route))) {
      if (!nextAuthToken) {
        const linkToken = req.nextUrl.searchParams.get("linkToken")
        return NextResponse.redirect(
          new URL(
            `/sign-in?callbackUrl=${req.nextUrl.pathname}${linkToken ? `?linkToken=${linkToken}` : ""}`,
            req.nextUrl
          )
        )
      }
    }

    return next(req, _next)
  }
}
