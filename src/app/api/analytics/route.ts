import { NextRequest, NextResponse } from "next/server"

import { getCurrentUser } from "@/lib/get-current-user"
import { prisma } from "@/lib/prisma"

export const GET = async (req: NextRequest) => {
  const auth = await getCurrentUser()

  const userList: {
    studentId: string
    name: string
    deptId: string
    deptName: string
  }[] = []

  if (auth.role !== "USER") {
    // 獲取所有用戶資訊
    const users = await prisma.user.findMany({
      select: {
        studentId: true,
        name: true
      }
    })

    console.log("users", users.length)

    //   D11019139 -> 19 系所代碼
    //   D11016139 -> 16 系所代碼
    //   N11019139 -> 19 系所代碼
    //   M11019139 -> 19 系所代碼

    //   尋找每位用戶的系所代碼 但要先檢查是否是學生 學生ID格式為 9碼 開頭為字母 其餘為數字

    const filterUsers = users.filter((user) => {
      return /^[a-zA-Z]\d{8}$/.test(user.studentId)
    })

    console.log("filterUsers", filterUsers.length)

    const usersDeptId = filterUsers.map((user) => {
      return {
        studentId: user.studentId,
        deptId: user.studentId.slice(4, 6)
      }
    })

    const getGroupByDeptName = async () => {
      //   尋找每位用戶的系所名稱
      const deptList = [
        {
          id: "12",
          name: "財稅系"
        },
        {
          id: "13",
          name: "國貿系"
        },
        {
          id: "14",
          name: "企管系"
        },
        {
          id: "16",
          name: "資管系"
        },
        {
          id: "17",
          name: "財金系"
        },
        {
          id: "18",
          name: "應外系"
        },
        {
          id: "19",
          name: "資科系"
        },
        {
          id: "21",
          name: "會資系"
        },
        {
          id: "22",
          name: "媒計系"
        },
        {
          id: "23",
          name: "行銷系"
        },

        {
          id: "25",
          name: "行銷系會展組"
        },

        {
          id: "29",
          name: "流通系"
        },
        {
          id: "34",
          name: "企管系時尚組"
        },
        {
          id: "35",
          name: "流通連鎖"
        },
        {
          id: "36",
          name: "財金不動產"
        },
        {
          id: "37",
          name: "應外系日文組"
        },
        {
          id: "50",
          name: "財金系數金組"
        },
        {
          id: "51",
          name: "風富系"
        },
        {
          id: "92",
          name: "通識中心"
        },
        {
          id: "93",
          name: "體育室"
        }
      ]

      console.log("deptList", deptList.length)

      //   將系所名稱加入到用戶資訊中

      usersDeptId.forEach((user) => {
        const deptName = deptList.find((dept) => dept.id === user.deptId)?.name || "未知"
        // console.log("deptName", deptName)
        userList.push({
          studentId: user.studentId,
          name: users.find((u) => u.studentId === user.studentId)?.name || "未知",
          deptId: user.deptId,
          deptName
        })
      })

      // console.log("userList", userList)

      //   group by deptName
      const deptNameList = userList.map((user) => user.deptName)
      const deptNameSet = new Set(deptNameList)
      const deptNameCount = Array.from(deptNameSet).map((deptName) => {
        return {
          deptName,
          count: deptNameList.filter((name) => name === deptName).length
        }
      })

      return deptNameCount
    }

    const getGroupByGrade = async () => {
      //   尋找每位用戶的年級
      const gradeList = usersDeptId.map((user) => {
        return {
          studentId: user.studentId,
          grade: user.studentId.slice(1, 4)
        }
      })

      //   group by grade
      const gradeSet = new Set(gradeList.map((user) => user.grade))
      const gradeCount = Array.from(gradeSet).map((grade) => {
        return {
          grade,
          count: gradeList.filter((user) => user.grade === grade).length
        }
      })

      return gradeCount
    }

    const getGroupByDeptNameAndGrade = async () => {
      //   group by deptName and grade
      const deptNameList = userList.map((user) => user.deptName)
      const deptNameSet = new Set(deptNameList)
      const deptNameCount = Array.from(deptNameSet).map((deptName) => {
        const deptNameUsers = userList.filter((user) => user.deptName === deptName)
        const gradeList = deptNameUsers.map((user) => user.studentId.slice(1, 4))
        const gradeSet = new Set(gradeList)
        const gradeCount = Array.from(gradeSet).map((grade) => {
          return {
            grade,
            count: gradeList.filter((user) => user === grade).length
          }
        })

        return {
          deptName,
          gradeCount
        }
      })

      return deptNameCount
    }

    const groupByGrade = await getGroupByGrade()

    const groupByDeptName = await getGroupByDeptName()

    const groupByDeptNameAndGrade = await getGroupByDeptNameAndGrade()

    return NextResponse.json({
      msg: "獲取分析資料成功",
      groupByGrade,
      groupByDeptName,
      groupByDeptNameAndGrade
    })
  } else {
    return NextResponse.json({ msg: "權限不足" })
  }
}
