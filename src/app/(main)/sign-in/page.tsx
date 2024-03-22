import { redirect } from "next/navigation"

import { getCurrentUser } from "@/lib/get-current-user"

import LoginButton from "./login-button"

const SignInPage = async ({ searchParams }: { searchParams: { callbackUrl?: string } }) => {
  const user = await getCurrentUser()

  if (user) {
    redirect(searchParams.callbackUrl ?? "/")
  }

  return (
    <div className='flex h-full flex-1 items-center justify-center'>
      <div className='w-1/3 min-w-80 rounded-2xl bg-white p-4 shadow-lg'>
        <h1 className='mb-4 text-center text-2xl font-bold'>登入</h1>
        {/* 繼續訪問前，請登入以獲取更多功能 */}
        <p className='text-center text-gray-500'>繼續訪問前，請登入以獲取更多功能</p>
        {/* 請使用學校提供的 Google 帳號登入 */}
        <p className='mb-4 text-center text-red-500'>請使用學校提供的 Google 帳號登入</p>
        <LoginButton />
      </div>
    </div>
  )
}

export default SignInPage
