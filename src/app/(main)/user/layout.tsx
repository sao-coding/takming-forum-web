import { Metadata } from "next"

export const metadata: Metadata = {
  title: "使用者",
  description: "使用者資訊"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
