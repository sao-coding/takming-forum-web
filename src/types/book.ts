import { JSONContent } from "@tiptap/react"

export type BookPost = {
  id: string
  cover: string
  title: string
  author: string
  isbn: string
  price: number
  publisher: string
  category: string
  deliveryMethod: string
  content: JSONContent
  contactCount: number
  createdAt: string
  sold: boolean
  userId: string
  user: {
    studentId: string
    picture: string
  }
}

export type BookCard = {
  id: string
  cover: string
  title: string
  author: string
  price: number
  category: string
  deliveryMethod: string
  createdAt: string
  sold: boolean
  userId: string
  user: {
    studentId: string
  }
}
