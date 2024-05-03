import { DefaultSession } from "next-auth"

import { UserRole } from "@prisma/client"

type UserId = string
// id: string;
// studentId: string;
// name: string;
// givenName: string;
// familyName: string;
// picture: string;
// email: string;
// role: string;
// createdAt: Date;
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId
    studentId: string
    givenName: string
    familyName: string
    picture: string
    email: string
    role: UserRole
    createdAt: Date
    updateAt: Date
  }
}

declare module "next-auth" {
  interface Profile {
    given_name: string
    family_name: string
    picture: string
  }
  interface Session {
    user: {
      // accessToken: string
      // provider: string
      id: UserId
      studentId: string
      givenName: string
      familyName: string
      picture: string
      email: string
      role: UserRole
      createdAt: Date
      updateAt: Date
    } & DefaultSession["user"]
  }
  // type User = DatabaseUser
}
