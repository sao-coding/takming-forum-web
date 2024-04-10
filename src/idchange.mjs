import primsa from "@prisma/client"
import { nanoid } from "nanoid"

// 改變使用者的 ID 欄位值 cuid -> nanoID

const prisma = new primsa.PrismaClient()

const idchange = async () => {
  const users = await prisma.book.findMany()
  for (const user of users) {
    console.log(`Changing ID for user: ${user.id}`)
    await prisma.book.update({
      where: { id: user.id },
      data: { id: nanoid() }
    })
  }
}
idchange()
