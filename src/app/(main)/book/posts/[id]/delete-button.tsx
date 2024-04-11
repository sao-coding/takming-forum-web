"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { IconTrash } from "@tabler/icons-react"

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const deleteBook = async () => {
    const res = await fetch(`/api/book?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    if (res.ok) {
      toast.success("刪除書籍成功")
      //   redirect("/book")
      router.push("/book")
    } else {
      toast.error(`刪除書籍失敗: ${data.msg}`)
    }
  }
  return (
    <button className='hover:animate-tada' onClick={deleteBook}>
      <IconTrash />
    </button>
  )
}

export default DeleteButton
