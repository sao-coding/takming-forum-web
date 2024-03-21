// model Post {
//     id        String    @id @default(cuid())
//     userId    String
//     anonymous Boolean
//     title     String
//     content   Json
//     comment   Comment[]
//     createdAt DateTime  @default(now())
//     updatedAt DateTime  @updatedAt
//     user      User      @relation(fields: [userId], references: [id])
//   }

// {
//     "id": "cltu5u87l0000132efmsasz8e",
//     "title": "測試文章",
//     "content": {
//         "type": "doc",
//         "content": [
//             {
//                 "type": "paragraph",
//                 "content": [
//                     {
//                         "type": "text",
//                         "text": "測試文章"
//                     }
//                 ]
//             }
//         ]
//     },
//     "anonymous": true,
//     "user": {
//         "id": "cltcjlcsz000010wlous81ejd",
//         "name": "欒文皓",
//         "picture": "https://lh3.googleusercontent.com/a/ACg8ocIMB1SV_G4Uj_ladCoc8xhhFHBpWDbgWKH3U0m_784UyA=s96-c"
//     }
// }

// {
//     "id": "cltu5u87l0000132efmsasz8e",
//     "title": "測試文章",
//     "content": {
//         "type": "doc",
//         "content": [
//             {
//                 "type": "paragraph",
//                 "content": [
//                     {
//                         "type": "text",
//                         "text": "測試文章"
//                     }
//                 ]
//             }
//         ]
//     },
//     "anonymous": true,
//     "user": null
// }

import { JSONContent } from "@tiptap/react"

type User = {
  id: string
  name: string
  picture: string
}

export type Post = {
  id: string
  anonymous: boolean
  title: string
  content: JSONContent
  comment: Comment[]
  createdAt: string
  updatedAt: string
  user: User | null
}

// model Comment {
//     id        String   @id @default(cuid())
//     content   String
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
//     user      User     @relation(fields: [userId], references: [id])
//     userId    String
//     post      Post     @relation(fields: [postId], references: [id])
//     postId    String
//   }

export type Comment = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
}
