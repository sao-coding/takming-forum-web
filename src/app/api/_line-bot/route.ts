// // Line Account link 實作
// import { NextRequest, NextResponse } from "next/server"

// import { site } from "@/config/site"
// import { prisma } from "@/lib/prisma"
// // {
// //     "type": "bubble",
// //     "header": {
// //       "type": "box",
// //       "layout": "vertical",
// //       "contents": [
// //         {
// //           "type": "text",
// //           "text": "尚未綁定帳號",
// //           "align": "center",
// //           "weight": "bold",
// //           "scaling": false
// //         }
// //       ]
// //     },
// //     "body": {
// //       "type": "box",
// //       "layout": "vertical",
// //       "contents": [
// //         {
// //           "type": "button",
// //           "action": {
// //             "type": "uri",
// //             "label": "action",
// //             "uri": "http://linecorp.com/"
// //           },
// //           "style": "primary",
// //           "color": "#f78711"
// //         }
// //       ]
// //     },
// //     "styles": {
// //       "hero": {
// //         "separator": false
// //       },
// //       "body": {
// //         "separator": true
// //       }
// //     }
// //   }

// // 回覆訊息的內容
// // {
// //     "destination": "U092e3ebdfda9a30591dffd878de0c0cf",
// //     "events": [
// //       {
// //         "type": "message",
// //         "message": {
// //           "type": "text",
// //           "id": "539510360697209194",
// //           "quoteToken": "gfqYfKl-YLkp2nSfoos-HrujUQyUbSJSkcTogbLZO-L8D1SkTZsN3wBreP8ZHuQzBs2tcqpYoitZuaw_ISaIXl-UpW2nRKQQNM5nPuP8H5vo4i1VJdXBoSJXn2sQSpZnTC-AHrNNfWah9o3sL8xRJg",
// //           "text": "test"
// //         },
// //         "webhookEventId": "01JF99209H46YR5QWSTKP5B3B2",
// //         "deliveryContext": {
// //           "isRedelivery": false
// //         },
// //         "timestamp": 1734404538165,
// //         "source": {
// //           "type": "user",
// //           "userId": "U0142b5abd211d48eff752245b720517d"
// //         },
// //         "replyToken": "7a2305e8fd0c492c9b84e7a6692d960c",
// //         "mode": "active"
// //       }
// //     ]
// //   }

// // 貼圖格式
// // {
// //     "destination": "U092e3ebdfda9a30591dffd878de0c0cf",
// //     "events": [
// //       {
// //         "type": "message",
// //         "message": {
// //           "type": "sticker",
// //           "id": "539511475191153382",
// //           "quoteToken": "pFSoA8hjTk3y4xq-zAM8gHkAWhPl6LSGgoIWmXSBi6OS_HarDUBfw_dUFWDJ7LQOBnxAGwqEQl6wHdsp2YR2Wqe82Byg0kouZkxyjjJAsTGj4EA5NNmFecVqkcj6NYNcCQqlmxq4lNaB1CUOSASwKw",
// //           "stickerId": "52114110",
// //           "packageId": "11539",
// //           "stickerResourceType": "ANIMATION",
// //           "keywords": [
// //             "universtar",
// //             "appreciate",
// //             "Bowing",
// //             "Thanks",
// //             "thankful",
// //             "grateful",
// //             "Pleading",
// //             "Please"
// //           ]
// //         },
// //         "webhookEventId": "01JF99P8S5R0NJBVGRVFHTRETR",
// //         "deliveryContext": {
// //           "isRedelivery": false
// //         },
// //         "timestamp": 1734405202328,
// //         "source": {
// //           "type": "user",
// //           "userId": "U0142b5abd211d48eff752245b720517d"
// //         },
// //         "replyToken": "5a32fb3d44994df7bb7d8c6b2e64f091",
// //         "mode": "active"
// //       }
// //     ]
// //   }

// export const GET = async (req: NextRequest) => {
//   return NextResponse.json({ msg: "Line Account link 實作" })
// }

// export const POST = async (req: NextRequest) => {
//   const body = await req.json()
//   //  印出 body 所有內容 [Object] 也要印出
//   console.log(JSON.stringify(body, null, 2))
//   const messageType = body.events[0].type
//   console.log("messageType", messageType)
//   const lineUserId = body.events[0].source.userId
//   console.log("lineUserId", lineUserId)

//   if (messageType === "accountLink") {
//     const result = body.events[0].link.result
//     const nonce = body.events[0].link.nonce
//     console.log("accountLink")
//     console.log("result", result)
//     console.log("nonce", nonce)

//     await prisma.userSettings.update({
//       where: {
//         lineNonce: nonce
//       },
//       data: {
//         lineUserId
//       }
//     })

//     const replyMessage = {
//       replyToken: body.events[0].replyToken,
//       messages: [
//         {
//           type: "text",
//           text: "綁定成功"
//         }
//       ]
//     }

//     //   https://api.line.me/v2/bot/message/push
//     //  回覆訊息的內容
//     const replyRes = await fetch("https://api.line.me/v2/bot/message/reply", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer aUdyNxIjH4zVL6gaDr55qCbKcetxviN3pQBNF0PgvQEWLyKnD1ilG0pJsGv44N442OeQQj5dMF7Zw46qeiAF0wZ6ofGdeK4ilVnT2qZwwyOLq3EzLEp7fzNXgzvPn5XXRZPY4d9FALVSHWquj9hmOgdB04t89/1O/w1cDnyilFU=`
//         //   Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
//       },
//       body: JSON.stringify(replyMessage)
//     })

//     const replyData = await replyRes.json()

//     console.log("replyData", replyData)

//     return NextResponse.json({ msg: "Line Account link 實作" })
//   }

//   // 獲取 linkToken
//   // https://api.line.me/v2/bot/user/U0142b5abd211d48eff752245b720517d/linkToken
//   const linkTokenRes = await fetch(`https://api.line.me/v2/bot/user/${lineUserId}/linkToken`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer aUdyNxIjH4zVL6gaDr55qCbKcetxviN3pQBNF0PgvQEWLyKnD1ilG0pJsGv44N442OeQQj5dMF7Zw46qeiAF0wZ6ofGdeK4ilVnT2qZwwyOLq3EzLEp7fzNXgzvPn5XXRZPY4d9FALVSHWquj9hmOgdB04t89/1O/w1cDnyilFU=`
//       //   Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
//     }
//   })

//   const linkTokenData = await linkTokenRes.json()

//   //  回覆訊息的內容
//   const replyMessage = {
//     replyToken: body.events[0].replyToken,
//     messages: [
//       {
//         type: "flex",
//         altText: "尚未綁定帳號",
//         contents: {
//           type: "bubble",
//           header: {
//             type: "box",
//             layout: "vertical",
//             contents: [
//               {
//                 type: "text",
//                 text: "尚未綁定帳號",
//                 align: "center",
//                 weight: "bold",
//                 scaling: false
//               }
//             ]
//           },
//           body: {
//             type: "box",
//             layout: "vertical",
//             contents: [
//               {
//                 type: "button",
//                 action: {
//                   type: "uri",
//                   label: "綁定帳號",
//                   uri: `${site.url}/line-bot-link?linkToken=${linkTokenData.linkToken}`
//                 },
//                 style: "primary",
//                 color: "#f78711"
//               }
//             ]
//           },
//           styles: {
//             body: {
//               separator: true
//             }
//           }
//         }
//       }
//     ]
//   }

//   //   https://api.line.me/v2/bot/message/push
//   //  回覆訊息的內容
//   const replyRes = await fetch("https://api.line.me/v2/bot/message/reply", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer aUdyNxIjH4zVL6gaDr55qCbKcetxviN3pQBNF0PgvQEWLyKnD1ilG0pJsGv44N442OeQQj5dMF7Zw46qeiAF0wZ6ofGdeK4ilVnT2qZwwyOLq3EzLEp7fzNXgzvPn5XXRZPY4d9FALVSHWquj9hmOgdB04t89/1O/w1cDnyilFU=`
//       //   Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
//     },
//     body: JSON.stringify(replyMessage)
//   })

//   const replyData = await replyRes.json()

//   console.log("replyData", replyData)

//   return NextResponse.json({ msg: "Line Account link 實作" })
// }
