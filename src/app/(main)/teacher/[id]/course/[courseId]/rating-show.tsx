import { IconStar, IconStarHalfFilled } from "@tabler/icons-react"

const Rating = ({ averageRating }: { averageRating: string }) => {
  // 5.3 小數拆成兩個部分
  const [integer, decimal] = averageRating ? averageRating.split(".") : [0, 0]
  // 整數部分 顯示整顆星星
  // 小數部分 顯示半顆星星
  const totalStars = 5
  console.log("integer", integer)
  console.log("decimal", decimal)
  return (
    <div className='relative flex items-center gap-1'>
      {Array.from({ length: Number(integer) }).map((_, i) => (
        <IconStar key={i} className='fill-amber-500 text-amber-500' />
      ))}
      {/* 有小數部分 顯示半顆星星 */}
      {Number(decimal) > 0 && <IconStarHalfFilled className='fill-amber-500 text-amber-500' />}
      <span className='absolute -right-8 font-semibold text-amber-500'>{averageRating}</span>
      {
        // 5 - 整數部分 - 1
        Array.from({ length: totalStars - Number(integer) - (Number(decimal) > 0 ? 1 : 0) }).map(
          (_, i) => (
            <IconStar key={i} className='text-amber-500' />
          )
        )
      }
    </div>
  )
}

export default Rating
