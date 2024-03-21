"use client"
// import Image, { ImageProps } from "next/image"
import React from "react"

import { cn } from "@/lib/utils"

type ImgProps = {
  src: string
  alt: string
  //   width: number
  //   height: number
  className?: string
  fallback: React.ReactNode
}
// & ImageProps

const Img = (props: ImgProps) => {
  const { src, alt, fallback, className, ...rest } = props
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement>(null)

  React.useEffect(() => {
    if (imageRef.current?.complete) {
      setLoading(false)
    }
  }, [])

  // React.useEffect(() => {
  //   console.log("Loading:", loading)
  //   console.log("Error:", error)
  // }, [loading, error])

  return (
    <>
      {error ? (
        fallback
      ) : (
        <div className={cn("h-full w-full", loading && "animate-pulse")}>
          <img
            ref={imageRef}
            src={src}
            // width={width}
            // height={height}
            sizes='fill'
            className={cn(
              "rounded-md object-cover shadow-md transition-[scale,filter] duration-700",
              loading && "scale-[1.02] blur-xl grayscale",
              className
            )}
            alt={alt}
            loading='lazy'
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
            {...rest}
          />
        </div>
      )}
    </>
  )
}

export default Img
