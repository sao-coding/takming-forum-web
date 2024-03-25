import { headers } from "next/headers"
import Link from "next/link"

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get("host")
  //   const data = await getSiteData(domain)
  return (
    <section className='flex h-screen flex-col items-center justify-center bg-white'>
      {/* background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif); */}
      <div className='h-[400px] w-full bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] bg-center'>
        <h1 className='text-center text-6xl'>404</h1>
      </div>
      <div className='-mt-12 text-center'>
        <h3 className='text-2xl'>看來你迷路了</h3>

        <p>這個頁面不存在</p>

        <Link
          href='/'
          className='mt-4 block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
        >
          返回首頁
        </Link>
      </div>
    </section>
  )
}
