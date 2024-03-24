"use client"

import React from "react"
import { signIn } from "next-auth/react"
import isUaWebView from "is-ua-webview"

import { IconGoogle } from "@/components/icons/Google"
import { IconLoader2 } from "@tabler/icons-react"

const LoginButton = () => {
  const [isWebView, setIsWebView] = React.useState<boolean | string>("loading")

  React.useEffect(() => {
    setIsWebView(
      isUaWebView(
        "Mozilla/5.0 (Linux; Android 4.4.4; One Build/KTU84L.H4) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/33.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/28.0.0.20.16;]"
      )
      // isUaWebView(window.navigator.userAgent)
    )
  }, [])

  return (
    <>
      {isWebView === "loading" ? (
        <IconLoader2 className='mx-auto animate-spin' />
      ) : (
        <>
          {isWebView ? (
            <p className='text-center text-gray-500'>
              Google 登入無法在 WebView 中使用
              <br />
              請開啟 Chrome 或 Safari 進行登入
            </p>
          ) : (
            <button
              // to='/sign-in'
              className='flex w-full items-center gap-4 rounded-lg border from-orange-500 to-amber-500 p-4 hover:bg-gradient-to-r hover:text-white'
              onClick={() => {
                signIn("google")
              }}
            >
              <IconGoogle className='h-6 w-6' />
              <span>登入</span>
            </button>
          )}
        </>
      )}
    </>
  )
}

export default LoginButton
