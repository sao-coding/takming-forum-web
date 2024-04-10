import primsa from "@prisma/client"
import { nanoid } from "nanoid"

// 改變使用者的 ID 欄位值 cuid -> nanoID

const prisma = new primsa.PrismaClient()

const userSettingsCreate = async () => {
  // await prisma.userSettings.create({
  //   data: {
  //     email: userInfo.email,
  //     user: {
  //       connect: {
  //         id: newUser.id
  //       }
  //     }
  //   }
  // })
  // 搜尋所有的使用者
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "asc"
    }
  })
  // 對每一個使用者新增一筆 userSettings 資料
  for (const user of users) {
    console.log(`創使用者設定資料: ${user.id} ${user.studentId} ${user.name}`)
    await prisma.userSettings.create({
      data: {
        email: user.email,
        user: {
          connect: {
            id: user.id
          }
        },
        createdAt: user.createdAt
      }
    })
  }
}
userSettingsCreate()
