"use client"

import { toast } from "sonner"

const TestPage = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <h1>Test Page</h1>
      <button onClick={() => toast.loading("Hello World!")}>Test Button</button>
    </div>
  )
}

export default TestPage
