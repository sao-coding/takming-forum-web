import { Metadata } from "next"

export const metadata: Metadata = {
  title: "選擇老師",
  description: "選擇老師"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
