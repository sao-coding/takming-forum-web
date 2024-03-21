"use client"

import { signIn } from "next-auth/react"

import { IconGoogle } from "@/components/icons/Google"

const LoginButton = () => {
  return (
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
  )
}

export default LoginButton
