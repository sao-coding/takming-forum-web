import Script from "next/script"

const UmamiAnalytics = () => {
  return (
    <Script
      async
      src='https://umami.sao-x.com/script.js'
      data-website-id='7fa5b144-c4ec-4954-be98-6d81679244d6'
    />
  )
}

export default UmamiAnalytics
