import { Metadata } from "next"

export const metadata: Metadata = {
  title: "排行榜",
  description: "評論數的排行"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
