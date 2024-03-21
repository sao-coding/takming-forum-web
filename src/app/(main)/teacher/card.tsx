import Img from "@/components/ui/img"
import { Teacher } from "@/types"

// 顯示老師的卡片
const Card = ({ teacher }: { teacher: Teacher }) => {
  return (
    <div className='relative z-[1] flex flex-col items-center justify-center gap-2 rounded-3xl bg-white p-4 shadow group-hover:border-slate-700'>
      <div className='w-full px-4'>
        <div className='relative block aspect-square w-full overflow-hidden rounded-full border'>
          <Img
            // src='https://www.kadokawa.com.tw/cdn/shop/products/product_202010121633511_450x666_crop_center.jpg'
            src={teacher.picture}
            alt={teacher.name}
            className='absolute top-0 h-full w-full rounded-xl object-cover object-top transition-transform duration-300 hover:scale-105'
            fallback={
              <div className='flex h-full w-full items-center justify-center bg-input'>
                <div className='text-4xl font-bold text-white'>
                  {/* 只顯示姓名 */}
                  {teacher.name.split("")[0]}
                </div>
              </div>
            }
          />
        </div>
      </div>
      <div>
        <h3 className='text-lg font-bold'>{teacher.name}</h3>
      </div>
    </div>
  )
}

export default Card
