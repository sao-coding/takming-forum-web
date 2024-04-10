"use client"

import React from "react"
import { useInView } from "react-intersection-observer"

import { Log } from "@/types"
import { useInfiniteQuery } from "@tanstack/react-query"

import Card from "./card"

const LogPage = () => {
  const { ref, inView } = useInView()
  const perPage = 5
  const {
    data: logs,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<Log[]>({
    queryKey: ["logs"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/log?page=${pageParam}&perPage=${perPage}`)
      const data = await res.json()
      return data.logs
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      //   console.log({
      //     lastPage,
      //     allPages
      //   })
      return lastPage.length === perPage ? allPages.length : undefined
    }
  })

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  return (
    <div className='space-y-4'>
      <h1 className='text-2xl font-bold'>日誌中心</h1>
      {isSuccess && (
        <ul className='space-y-2'>
          {logs.pages.map((page) =>
            page.map((log, i) => {
              if (page.length === i + 1) {
                return <Card ref={ref} key={log.id} log={log} />
              }
              return <Card key={log.id} log={log} />
            })
          )}
        </ul>
      )}
      {(isFetchingNextPage || !logs) && (
        <>
          {Array.from({ length: perPage }).map((_, i) => (
            <div key={i}>載入中...</div>
          ))}
        </>
      )}
    </div>
  )
}

export default LogPage
