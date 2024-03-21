"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import cx from "classix"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { NAV_LINKS } from "@/config/menu"

const LeftSiderbar = ({ user }: { user: Session["user"] | null }) => {
  const pathname = usePathname()

  return (
    <section className='sticky left-0 top-0 hidden h-screen bg-white p-6 pt-24 sm:block xl:w-64'>
      <div className='flex h-full w-full flex-col items-center justify-between'>
        <div className='flex w-full flex-col gap-6'>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.herf}
              href={link.herf}
              className={cx(
                "flex w-full items-center gap-4 rounded-lg from-orange-500 to-amber-500 p-4 hover:bg-gradient-to-r hover:text-white",
                (link.herf === "/" && pathname === "/") ||
                  (link.herf === "/" && pathname === "/editor")
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                  : ((pathname.startsWith(link.herf) && link.herf !== "/") ||
                      (pathname.startsWith("/teacher") && link.herf === "/course")) &&
                      "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
              )}
            >
              <link.icon className={cx(link.herf === "/rank" && "rotate-180")} />
              <span className='hidden xl:block'>{link.text}</span>
            </Link>
          ))}
        </div>
        {user ? (
          <button
            className='flex w-full items-center justify-center rounded-lg border from-orange-500 to-amber-500 p-2 hover:bg-gradient-to-r hover:text-white'
            onClick={async () => {
              console.log("logout")
              // 刪除所有Cookie
              Object.keys(Cookies.get()).forEach((cookieName) => {
                console.log(cookieName)
                Cookies.remove(cookieName)
              })
              const status = await signOut({
                redirect: false
              })
              if (status) {
                toast.success("登出成功")
                window.location.href = "/sign-in"
              }
            }}
          >
            <span>登出</span>
          </button>
        ) : (
          <Link
            href='/sign-in'
            className='flex w-full items-center justify-center rounded-lg border from-orange-500 to-amber-500 p-2 hover:bg-gradient-to-r hover:text-white'
          >
            <span>登入</span>
          </Link>
        )}
      </div>
    </section>
  )
}

export default LeftSiderbar
