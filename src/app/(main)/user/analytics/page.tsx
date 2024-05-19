"use client"
import React from "react"
import * as echarts from "echarts"

// {
//     "msg": "獲取分析資料成功",
//     "groupByGrade": [
//         {
//             "grade": "111",
//             "count": 43
//         },
//         {
//             "grade": "112",
//             "count": 34
//         },
//         {
//             "grade": "110",
//             "count": 44
//         },
//         {
//             "grade": "109",
//             "count": 13
//         },
//         {
//             "grade": "106",
//             "count": 1
//         },
//         {
//             "grade": "108",
//             "count": 1
//         }
//     ],
//     "groupByDeptName": [
//         {
//             "deptName": "資管系",
//             "count": 21
//         },
//         {
//             "deptName": "會資系",
//             "count": 2
//         },
//         {
//             "deptName": "財金系數金組",
//             "count": 2
//         },
//         {
//             "deptName": "媒計系",
//             "count": 12
//         },
//         {
//             "deptName": "資科系",
//             "count": 28
//         },
//         {
//             "deptName": "財金系",
//             "count": 8
//         },
//         {
//             "deptName": "企管系時尚組",
//             "count": 9
//         },
//         {
//             "deptName": "流通連鎖",
//             "count": 6
//         },
//         {
//             "deptName": "應外系",
//             "count": 6
//         },
//         {
//             "deptName": "財稅系",
//             "count": 6
//         },
//         {
//             "deptName": "國貿系",
//             "count": 2
//         },
//         {
//             "deptName": "流通系",
//             "count": 4
//         },
//         {
//             "deptName": "企管系",
//             "count": 11
//         },
//         {
//             "deptName": "風富系",
//             "count": 4
//         },
//         {
//             "deptName": "財金不動產",
//             "count": 1
//         },
//         {
//             "deptName": "行銷系",
//             "count": 7
//         },
//         {
//             "deptName": "行銷系會展組",
//             "count": 5
//         },
//         {
//             "deptName": "應外系日文組",
//             "count": 2
//         }
//     ],
//     "groupByDeptNameAndGrade": [
//         {
//             "deptName": "資管系",
//             "gradeCount": [
//                 {
//                     "grade": "111",
//                     "count": 9
//                 },
//                 {
//                     "grade": "112",
//                     "count": 6
//                 },
//                 {
//                     "grade": "110",
//                     "count": 6
//                 }
//             ]
//         },
//         {
//             "deptName": "會資系",
//             "gradeCount": [
//                 {
//                     "grade": "112",
//                     "count": 1
//                 },
//                 {
//                     "grade": "111",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "財金系數金組",
//             "gradeCount": [
//                 {
//                     "grade": "111",
//                     "count": 2
//                 }
//             ]
//         },
//         {
//             "deptName": "媒計系",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 2
//                 },
//                 {
//                     "grade": "112",
//                     "count": 5
//                 },
//                 {
//                     "grade": "111",
//                     "count": 4
//                 },
//                 {
//                     "grade": "109",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "資科系",
//             "gradeCount": [
//                 {
//                     "grade": "109",
//                     "count": 2
//                 },
//                 {
//                     "grade": "110",
//                     "count": 15
//                 },
//                 {
//                     "grade": "112",
//                     "count": 6
//                 },
//                 {
//                     "grade": "111",
//                     "count": 5
//                 }
//             ]
//         },
//         {
//             "deptName": "財金系",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 4
//                 },
//                 {
//                     "grade": "109",
//                     "count": 3
//                 },
//                 {
//                     "grade": "111",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "企管系時尚組",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 2
//                 },
//                 {
//                     "grade": "109",
//                     "count": 2
//                 },
//                 {
//                     "grade": "111",
//                     "count": 4
//                 },
//                 {
//                     "grade": "112",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "流通連鎖",
//             "gradeCount": [
//                 {
//                     "grade": "112",
//                     "count": 1
//                 },
//                 {
//                     "grade": "111",
//                     "count": 1
//                 },
//                 {
//                     "grade": "109",
//                     "count": 2
//                 },
//                 {
//                     "grade": "110",
//                     "count": 2
//                 }
//             ]
//         },
//         {
//             "deptName": "應外系",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 4
//                 },
//                 {
//                     "grade": "111",
//                     "count": 2
//                 }
//             ]
//         },
//         {
//             "deptName": "財稅系",
//             "gradeCount": [
//                 {
//                     "grade": "109",
//                     "count": 1
//                 },
//                 {
//                     "grade": "112",
//                     "count": 4
//                 },
//                 {
//                     "grade": "111",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "國貿系",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 1
//                 },
//                 {
//                     "grade": "112",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "流通系",
//             "gradeCount": [
//                 {
//                     "grade": "111",
//                     "count": 1
//                 },
//                 {
//                     "grade": "110",
//                     "count": 1
//                 },
//                 {
//                     "grade": "108",
//                     "count": 1
//                 },
//                 {
//                     "grade": "112",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "企管系",
//             "gradeCount": [
//                 {
//                     "grade": "111",
//                     "count": 6
//                 },
//                 {
//                     "grade": "112",
//                     "count": 1
//                 },
//                 {
//                     "grade": "106",
//                     "count": 1
//                 },
//                 {
//                     "grade": "110",
//                     "count": 3
//                 }
//             ]
//         },
//         {
//             "deptName": "風富系",
//             "gradeCount": [
//                 {
//                     "grade": "112",
//                     "count": 1
//                 },
//                 {
//                     "grade": "109",
//                     "count": 2
//                 },
//                 {
//                     "grade": "110",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "財金不動產",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "行銷系",
//             "gradeCount": [
//                 {
//                     "grade": "110",
//                     "count": 2
//                 },
//                 {
//                     "grade": "112",
//                     "count": 4
//                 },
//                 {
//                     "grade": "111",
//                     "count": 1
//                 }
//             ]
//         },
//         {
//             "deptName": "行銷系會展組",
//             "gradeCount": [
//                 {
//                     "grade": "112",
//                     "count": 1
//                 },
//                 {
//                     "grade": "111",
//                     "count": 4
//                 }
//             ]
//         },
//         {
//             "deptName": "應外系日文組",
//             "gradeCount": [
//                 {
//                     "grade": "111",
//                     "count": 1
//                 },
//                 {
//                     "grade": "112",
//                     "count": 1
//                 }
//             ]
//         }
//     ]
// }

const AnalyticsPage = () => {
  type Data = {
    groupByGrade: {
      grade: string
      count: number
    }[]
    groupByDeptName: {
      deptName: string
      count: number
    }[]
    groupByDeptNameAndGrade: {
      deptName: string
      gradeCount: {
        grade: string
        count: number
      }[]
    }[]
    userList: {
      studentId: string
      deptName: string
      name: string
      createdAt: string
      updatedAt: string
    }[]
    teacherList: {
      studentId: string
      name: string
      createdAt: string
      updatedAt: string
    }[]
  }

  const [data, setData] = React.useState<Data>({
    groupByGrade: [],
    groupByDeptName: [],
    groupByDeptNameAndGrade: [],
    userList: [],
    teacherList: []
  })

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/analytics")
      const data = await response.json()
      setData(data)
    }

    fetchData()
  }, [])

  React.useEffect(() => {
    const chart = echarts.init(document.getElementById("groupByGrade"))
    chart.setOption({
      title: {
        text: "年級分布"
      },
      tooltip: {},
      xAxis: {
        data: data.groupByGrade.map((item) => item.grade)
      },
      yAxis: {},
      series: [
        {
          name: "人數",
          type: "bar",
          data: data.groupByGrade.map((item) => item.count)
        }
      ]
    })
  }, [data])

  React.useEffect(() => {
    const chart = echarts.init(document.getElementById("groupByDeptName"))
    chart.setOption({
      title: {
        text: "系所分布"
      },
      tooltip: {},
      xAxis: {
        data: data.groupByDeptName.map((item) => item.deptName)
      },
      yAxis: {},
      series: [
        {
          name: "人數",
          type: "bar",
          data: data.groupByDeptName.map((item) => item.count)
        }
      ]
    })
  }, [data])

  React.useEffect(() => {
    data.groupByDeptNameAndGrade.forEach((item) => {
      const chart = echarts.init(document.getElementById(item.deptName))
      chart.setOption({
        title: {
          text: `${item.deptName} 年級分布`
        },
        tooltip: {},
        xAxis: {
          data: item.gradeCount.map((grade) => grade.grade)
        },
        yAxis: {},
        series: [
          {
            name: "人數",
            type: "bar",
            data: item.gradeCount.map((grade) => grade.count)
          }
        ]
      })
    })
  }, [data])

  return (
    <div>
      <div id='groupByGrade' style={{ height: 400 }}></div>
      <div id='groupByDeptName' style={{ height: 400 }}></div>
      {data.groupByDeptNameAndGrade.map((item) => (
        <div key={item.deptName} id={item.deptName} style={{ height: 400 }}></div>
      ))}
      <hr className='my-4' />
      <h2 className='mb-2 text-xl font-bold'>學生列表</h2>
      <ul className='grid grid-cols-3 gap-2 md:gap-4'>
        {data.userList.map((user) => (
          <li key={user.studentId} className='rounded-xl border bg-white p-2'>
            <p>{user.studentId}</p>
            <p>{user.deptName}</p>
            <p>{user.name}</p>
            <hr className='my-1' />
            <div className='space-y-1'>
              <p> 創建時間 </p>
              <p> {new Date(user.createdAt).toLocaleString()}</p>
              <p> 更新時間 </p>
              <p>{new Date(user.updatedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
      <hr className='my-4' />
      <h2 className='mb-2 text-xl font-bold'>教師列表</h2>
      <ul className='grid grid-cols-3 gap-2 md:gap-4'>
        {data.teacherList.map((teacher) => (
          <li key={teacher.studentId} className='rounded-xl border bg-white p-2'>
            <p>{teacher.studentId}</p>
            <p>{teacher.name}</p>
            <hr className='my-1' />
            <div className='space-y-1'>
              <p> 創建時間 </p>
              <p> {new Date(teacher.createdAt).toLocaleString()}</p>
              <p> 更新時間 </p>
              <p>{new Date(teacher.updatedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnalyticsPage
