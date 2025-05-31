import Script from "next/script"

const GoogleAds = () => {
  return (
    <Script
      strategy='lazyOnload'
      src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2271001084588765'
      crossOrigin='anonymous'
      async
    />
  )
}

export default GoogleAds
