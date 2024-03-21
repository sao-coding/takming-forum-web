import React from "react"
import cx from "classix"

import { IconStar } from "@tabler/icons-react"

const Star = ({
  ratingValue,
  setRatingValue
}: {
  ratingValue: number
  setRatingValue: (value: number) => void
}) => {
  const [hover, setHover] = React.useState<number | null>(null)

  //   React.useEffect(() => {
  //     console.log("ratingValue", ratingValue)
  //   }, [ratingValue])

  React.useEffect(() => {
    console.log("hover", hover)
  }, [hover])

  return (
    <div className='flex items-center gap-1'>
      {[...Array(5)].map((_, i) => {
        const hoverValue = i + 1

        return (
          <label key={i} className='cursor-pointer'>
            <input type='radio' name='rating' value={hoverValue} className='hidden' />
            <IconStar
              className={cx(
                "text-amber-500",
                ratingValue >= hoverValue && "fill-amber-500",
                hoverValue <= (hover || 0) && "fill-amber-500"
              )}
              onMouseEnter={() => setHover(hoverValue)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setRatingValue(hoverValue)}
            />
          </label>
        )
      })}
    </div>
  )
}

const Rating = ({
  ratingValue,
  setRatingValue
}: {
  ratingValue: number
  setRatingValue: (value: number) => void
}) => {
  return (
    <div className='flex items-center gap-1'>
      <Star ratingValue={ratingValue} setRatingValue={setRatingValue} />
      <span className='ml-2 font-semibold text-amber-500'>{ratingValue}</span>
    </div>
  )
}

export default Rating
