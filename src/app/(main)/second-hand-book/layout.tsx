import { Metadata } from "next"

export const metadata: Metadata = {
  title: "二手書",
  description: "一個買賣二手書的地方"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
