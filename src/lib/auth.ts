// import { cookies } from "next/headers"
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

import { prisma } from "@/lib/prisma"

// const setCookies = async (userid: string) => {
//   cookies().set("cookie_userid", userid, {
//     // 7天
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   })

//   const { currentYear: year, currentSem: sem } = await getCurrentYearSem()

//   const teacher = await getTeacher(userid, year, sem)
//   cookies().set("cookie_teacher", teacher.id, {
//     // 7天
//     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
//   })
// }

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // console.log("account", account, "profile", profile)

      if (account?.provider === "google" && profile?.email?.endsWith("@gs.takming.edu.tw")) {
        return true
      }
      return false
    },
    async jwt({ token, account, profile }) {
      // console.log("account#", account)
      // if (account) {
      //   return { ...token, provider: account.provider }
      // }
      if (!profile) {
        return token
      }
      let userInfo
      // 查詢使用者是否存在
      const existUser = await prisma.user.findUnique({
        where: {
          email: profile.email
        }
      })
      console.log("profile", {
        studentId: profile?.email?.split("@")[0].toUpperCase() as string,
        name: profile.name as string,
        givenName: profile.given_name as string,
        familyName: profile.family_name as string,
        picture: profile.picture as string,
        email: profile.email as string
      })
      // console.log("account", account)
      if (!existUser) {
        const newUser = await prisma.user.create({
          data: {
            studentId: profile?.email?.split("@")[0].toUpperCase() as string,
            name: profile.name as string,
            givenName: profile.given_name as string,
            familyName: profile.family_name as string,
            picture: profile.picture as string,
            email: profile.email as string
          }
        })
        console.log("使用者新增成功", newUser)
        userInfo = newUser
        // 新增使用者設定
        await prisma.userSettings.create({
          data: {
            email: userInfo.email,
            user: {
              connect: {
                id: newUser.id
              }
            }
          }
        })
      } else {
        console.log("使用者已存在", existUser)
        // 更新使用者登入時間
        userInfo = await prisma.user.update({
          where: {
            id: existUser.id
          },
          data: {
            updatedAt: new Date()
          }
        })
        // userInfo = existUser
      }
      console.log("token", token)
      // console.log("userInfo", userInfo)
      return {
        ...token,
        id: userInfo.id,
        studentId: userInfo.studentId,
        givenName: userInfo.givenName,
        familyName: userInfo.familyName,
        role: userInfo.role,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt
      }
    },
    async session({ session, token }) {
      // console.log("session token", token)
      if (token) {
        // id,role
        // console.log("session token", token)
        return {
          ...session,
          user: {
            id: token.id,
            studentId: token.studentId,
            name: token.name,
            givenName: token.givenName,
            familyName: token.familyName,
            picture: token.picture,
            email: token.email,
            role: token.role,
            createdAt: token.createdAt,
            updateAt: token.updateAt
          }
        }
      }
      return session
    }
  },
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60
  }
}

export default authOptions
