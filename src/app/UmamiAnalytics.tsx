import Script from "next/script"

const UmamiAnalytics = () => {
  // <script defer src="https://umami.sao-x.com/script.js" data-website-id="13eafc7d-a9b1-4159-8ca5-fb892eb5b2a0"></script>
  return (
    <Script
      async
      src='https://umami.sao-x.com/script.js'
      data-website-id='13eafc7d-a9b1-4159-8ca5-fb892eb5b2a0'
    />
  )
}

export default UmamiAnalytics
