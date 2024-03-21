import Container from "@/components/Container"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}
