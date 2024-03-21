"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Session } from "next-auth"
import cx from "classix"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NAV_LINKS } from "@/config/menu"
import { IconAlignRight } from "@tabler/icons-react"

const PhoneMenu = ({ user }: { user: Session["user"] | null }) => {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className='sm:hidden'>
        <IconAlignRight size={32} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>德明論壇</SheetTitle>
        </SheetHeader>
        <div className='flex h-full flex-col justify-between pb-4'>
          <div className='flex flex-col gap-2'>
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
                onClick={() => setOpen(false)}
              >
                <link.icon className={cx(link.herf === "/rank" && "rotate-180")} />
                <span>{link.text}</span>
              </Link>
            ))}
          </div>
          {!user && (
            <Link
              href='/sign-in'
              className='flex w-full items-center justify-center rounded-lg border from-orange-500 to-amber-500 p-2 hover:bg-gradient-to-r hover:text-white'
            >
              <span>登入</span>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default PhoneMenu
