// export default async function Page({
//     searchParams,
//   }: {
//     searchParams: Promise<{ [key: string]: string | string[] | undefined }>
//   }) {
//     const filters = (await searchParams).filters
//   }

// import Link from "next/link"
// import { nanoid } from "nanoid"

// import { getCurrentUser } from "@/lib/get-current-user"
// import { prisma } from "@/lib/prisma"

// const LineBotLinkPage = async ({
//   searchParams
// }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>
// }) => {
//   const linkToken = (await searchParams).linkToken
//   console.log("linkToken", linkToken)

//   const user = await getCurrentUser()
//   const nonce = nanoid(10)

//   await prisma.userSettings.update({
//     where: {
//       userId: user.id
//     },
//     data: {
//       lineNonce: nonce
//     }
//   })

//   return (
//     <div>
//       <h1>Line Bot Link {linkToken}</h1>
//       <Link
//         className='inline-flex rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 text-white'
//         href={`https://access.line.me/dialog/bot/accountLink?linkToken=${linkToken}&nonce=${nonce}`}
//         replace={true}
//       >
//         Link
//       </Link>
//     </div>
//   )
// }

// export default LineBotLinkPage
