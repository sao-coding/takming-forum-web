const LoadingTeacher = () => {
  return (
    <div className='flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow md:h-[332px] md:w-64'>
      <div className='aspect-square w-36 animate-pulse rounded-full bg-input sm:w-40 md:w-48' />

      <div className='my-1 h-5 w-1/3 animate-pulse rounded-full bg-input' />
      <div className='my-2 h-4 w-1/2 animate-pulse rounded-full bg-input' />
      <div className='my-1 h-4 w-2/3  animate-pulse rounded-full bg-input' />
    </div>
  )
}

export default LoadingTeacher
