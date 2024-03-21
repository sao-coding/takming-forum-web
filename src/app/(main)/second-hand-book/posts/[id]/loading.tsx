import { IconPhotoOff } from "@tabler/icons-react"

const Loading = () => {
  return (
    <div className='relative'>
      <div className='flex gap-4'>
        <div className='aspect-[2/3] w-36 animate-pulse rounded-xl border bg-gray-300 sm:w-40 md:w-48'>
          <div className='flex h-full w-full items-center justify-center'>
            <IconPhotoOff size={40} />
          </div>
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <div className='my-1 h-7 w-52 animate-pulse rounded-full bg-gray-300' />
          <div className='my-1 h-4 w-36 animate-pulse rounded-full bg-gray-300' />
          <div className='my-1 h-4 w-36 animate-pulse rounded-full bg-gray-300' />
          <div className='my-1 ml-auto h-4 w-20 animate-pulse rounded-full bg-gray-300' />
          <div className='absolute left-0 top-60 flex w-full flex-col gap-4 sm:static'>
            <div className='flex items-center justify-between'>
              <div className='my-1 h-4 w-24 animate-pulse rounded-full bg-gray-300' />
              <div className='my-1 h-4 w-24 animate-pulse rounded-full bg-gray-300' />
            </div>
            <div className='flex items-center justify-between'>
              <div className='my-1 h-4 w-24 animate-pulse rounded-full bg-gray-300' />
              <div className='my-1 h-4 w-24 animate-pulse rounded-full bg-gray-300' />
              <div className='my-1 h-4 w-24 animate-pulse rounded-full bg-gray-300' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading
