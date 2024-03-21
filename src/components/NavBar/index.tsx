import Link from "next/link"
import { Session } from "next-auth"

import UserMenu from "./user-menu"
const NavBar = ({ user }: { user: Session["user"] }) => {
  return (
    <header className='fixed top-0 z-10 w-full bg-white shadow-sm'>
      <div className='flex items-center justify-between px-4 py-3 sm:px-10'>
        <Link href='/' className='text-xl font-bold'>
          德明論壇
        </Link>
        <UserMenu user={user} />
      </div>
    </header>
  )
}

export default NavBar
