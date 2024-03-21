import { getCurrentUser } from "@/lib/get-current-user"

import LeftSiderbar from "./LeftSidebar"
import NavBar from "./NavBar"
import RightSidebar from "./RightSidebar"
const Container = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser()
  return (
    <>
      <NavBar user={user} />
      <div className='relative sm:flex'>
        <LeftSiderbar user={user} />
        <main className='min-w-0 sm:flex-1'>
          <section className='mx-auto flex min-h-screen w-full max-w-5xl flex-col p-2 pt-20 sm:block sm:p-6 sm:pt-32 md:px-14'>
            {/* <div className='mx-auto w-full max-w-5xl'>{children}</div> */}
            {children}
          </section>
        </main>
        <RightSidebar />
      </div>
    </>
  )
}

export default Container
