import { getServerSession } from "next-auth"
import { Session } from "next-auth"

import authOptions from "./auth"

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)
  // id: string;
  // studentId: string;
  // givenName: string;
  // familyName: string;
  // picture: string;
  // email: string;
  // role: UserRole;
  // createdAt: Date;
  // if (session) {
  //   return session.user
  // } else {
  //   return {
  //     id: "",
  //     studentId: "",
  //     givenName: "",
  //     familyName: "",
  //     picture: "",
  //     email: "",
  //     role: "student",
  //     createdAt: new Date()
  //   }
  // }
  return session?.user as Session["user"]
}
