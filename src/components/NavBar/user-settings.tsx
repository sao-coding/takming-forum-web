"use client"

import React from "react"
// import { useLocation } from "react-router-dom"
import { usePathname } from "next/navigation"
import cx from "classix"
import Cookies from "js-cookie"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { site } from "@/config/site"
import { userSettingsSchema } from "@/schemas/user-settings"
import { UserSettings as UserSettingsType } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconBrandLine } from "@tabler/icons-react"

const UserSettings = ({ open }: { open: boolean }) => {
  const [settings, setSettings] = React.useState({
    lineNotifyStatus: false,
    username: "",
    email: "",
    phone: "",
    lineId: "",
    igId: ""
  })

  const [lineNotifyToken, setLineNotifyToken] = React.useState(false)

  const pathname = usePathname()
  React.useEffect(() => {
    const getUserSettings = async () => {
      const toastId = toast.loading("獲取使用者設定中")

      const res = await fetch(`/api/user?type=settings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const { contact } = await res.json()
      const data = contact as UserSettingsType
      setLineNotifyToken(data.lineNotifyToken)
      if (!res.ok) {
        toast.error("獲取使用者設定失敗", { id: toastId })
        return {
          lineNotify: false,
          email: "",
          phone: "",
          lineId: "",
          igId: ""
        }
      }
      toast.success("獲取使用者設定成功", { id: toastId })
      setSettings({
        lineNotifyStatus: data.lineNotifyStatus ?? false,
        username: data.username ?? "",
        email: data.email ?? "",
        phone: data.phone ?? "",
        lineId: data.lineId ?? "",
        igId: data.igId ?? ""
      })
    }
    if (open) getUserSettings()
  }, [open])

  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      lineNotifyStatus: false,
      username: "",
      email: "",
      phone: "",
      lineId: "",
      igId: ""
    },
    values: settings
  })

  const onSave = async (data: z.infer<typeof userSettingsSchema>) => {
    const res = await fetch(`/api/user?type=settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const result = await res.json()
    if (!res.ok) {
      toast.error(`更新使用者設定失敗 ${result.msg}`)
      return
    } else {
      toast.success("更新使用者設定成功")
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>個人設定</DialogTitle>
      </DialogHeader>
      <DialogDescription asChild>
        <div className='flex flex-col gap-4'>
          {/* 設定通知 綁定 Line Notify */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-bold'>設定通知</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSave)} className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='lineNotifyStatus'
                  render={({ field }) => (
                    <FormItem className='flex items-center justify-between'>
                      <FormLabel>開啟 Line Notify 通知</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className='data-[state=checked]:bg-orange-500'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex items-center gap-2'>
                  <button
                    // className='flex items-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white'
                    className={cx(
                      "flex items-center gap-2 rounded-md px-4 py-2 text-white",
                      lineNotifyToken
                        ? "cursor-not-allowed bg-muted-foreground"
                        : "cursor-pointer bg-green-500"
                    )}
                    onClick={() => {
                      Cookies.set("callbackUrl", pathname, { expires: 1 })
                      window.location.href = `https://notify-bot.line.me/oauth/authorize?response_type=code&scope=notify&client_id=hKU2OAXBieJxHBFPg9J3k7&redirect_uri=${site.url}/api/line-notify&state=takming_forum`
                    }}
                    disabled={lineNotifyToken}
                  >
                    <IconBrandLine />
                    綁定 Line Notify
                  </button>

                  <div className='flex flex-1 flex-wrap items-center justify-between'>
                    <span>綁定後可收到通知</span>
                    <span
                      className={cx(
                        "rounded-md px-2 py-1 text-xs text-white",
                        lineNotifyToken ? "bg-green-500" : "bg-red-500"
                      )}
                    >
                      {lineNotifyToken ? "已綁定" : "未綁定"}
                    </span>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>電子郵件 (不可更改)</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>使用者名稱</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>手機號碼</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder='(可選)' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='lineId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Line ID</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder='(可選)' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='igId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram ID</FormLabel>
                      <FormControl>
                        <Input type='text' {...field} placeholder='(可選)' />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  variant='default'
                  className='bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                >
                  儲存
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogDescription>
    </DialogContent>
  )
}

export default UserSettings
