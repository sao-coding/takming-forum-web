"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Session } from "next-auth"

// import { ThemeProvider } from "next-themes"
import getIP from "@/utils/ip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Providers = ({
  children,
  session
}: {
  children: React.ReactNode
  session: Session | null
}) => {
  const [queryClient] = React.useState(() => new QueryClient())
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    const writeLog = async () => {
      let searchParamsList = searchParams
        .toString()
        .split("&")
        .map((param) => {
          const [key, value] = param.split("=")
          return { key, value: decodeURIComponent(value) }
        })

      if (searchParamsList.length === 1 && searchParamsList[0].key === "") {
        searchParamsList = []
      }

      fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ip: await getIP(),
          studentId: session?.user.studentId,
          name: session?.user.name,
          pathname,
          searchParams: searchParamsList
        })
      })
    }
    console.log("searchParams", searchParams.has("search"))
    if (session?.user.name) {
      if (pathname === "/course" || pathname === "/teacher") {
        if (!searchParams.has("search")) {
          console.log("writeLog")
          writeLog()
        }
      } else {
        writeLog()
      }
    }
  }, [pathname, searchParams])

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default Providers
