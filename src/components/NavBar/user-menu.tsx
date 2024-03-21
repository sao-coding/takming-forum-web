"use client"

import React from "react"
import Link from "next/link"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Cookies from "js-cookie"
import { toast } from "sonner"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Img from "@/components/ui/img"
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react"

import PhoneMenu from "./phone-menu"
import UserSettings from "./user-settings"

const UserMenu = ({ user }: { user: Session["user"] | null }) => {
  const [open, setOpen] = React.useState(false)
  const [modal, setModal] = React.useState(true)

  return (
    <div className='flex items-center gap-2'>
      {user ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu modal={modal}>
            <DropdownMenuTrigger asChild>
              <button className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300'>
                <Img
                  src={user.picture || ""}
                  alt=''
                  className='h-full w-full object-cover'
                  fallback={<IconUser size={32} />}
                />
              </button>
            </DropdownMenuTrigger>
            {/* 下面 距離右邊的距離 10px */}
            <DropdownMenuContent align={"end"} className='right-10'>
              <DropdownMenuLabel>
                <Link href='/user' className='flex items-center gap-2'>
                  <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300'>
                    <Img
                      src={user.picture || ""}
                      alt=''
                      className='h-full w-full object-cover'
                      fallback={<IconUser size={32} />}
                    />
                  </div>
                  <div>
                    <h3>{user.name}</h3>
                    <p>{user.studentId}</p>
                  </div>
                </Link>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger
                  className='flex w-full items-center gap-2'
                  onClick={() => {
                    setModal(false)
                  }}
                >
                  <IconSettings />
                  <span>個人設定</span>
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <button
                  className='flex w-full items-center gap-2'
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
                  <IconLogout />
                  <span>登出</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserSettings open={open} />
        </Dialog>
      ) : (
        <Link href='/sign-in' className='flex h-10 items-center gap-2'>
          <IconUser />
          <span>登入</span>
        </Link>
      )}
      <PhoneMenu user={user} />
    </div>
  )
}

export default UserMenu
