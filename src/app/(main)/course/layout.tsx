import { Metadata } from "next"

export const metadata: Metadata = {
  title: "課程評價",
  description: "一個查看和評價課程的地方"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
