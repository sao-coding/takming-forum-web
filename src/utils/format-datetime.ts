// 若 1 分鐘內顯示幾秒前，
// 若 1 小時內顯示幾分鐘前，
// 若 1 天內顯示幾小時前，
// 若31天內顯示幾天前，若超過31天，則顯示幾個月前，若超過12個月，則顯示幾年前
// 使用當地時間格式化時間

const formatDatetime = (datetime: string) => {
  const now = new Date()
  const date = new Date(datetime)
  const diff = now.getTime() - date.getTime()
  const sec = Math.floor(diff / 1000)
  const min = Math.floor(sec / 60)
  const hr = Math.floor(min / 60)
  const day = Math.floor(hr / 24)
  const month = Math.floor(day / 31)
  const year = Math.floor(month / 12)

  if (sec < 60) {
    return `${sec} 秒前`
  } else if (min < 60) {
    return `${min} 分鐘前`
  } else if (hr < 24) {
    return `${hr} 小時前`
  } else if (day < 31) {
    return `${day} 天前`
  } else if (month < 12) {
    return `${month} 月前`
  } else {
    return `${year} 年前`
  }
}

export default formatDatetime
