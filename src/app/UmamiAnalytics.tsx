import Script from "next/script"

const UmamiAnalytics = () => {
  // <script defer src="https://umami.sao-x.com/script.js" data-website-id="95225a9d-389b-4c3f-af77-92a923318e41"></script>
  return (
    <Script
      async
      src='https://umami.sao-x.com/script.js'
      data-website-id='95225a9d-389b-4c3f-af77-92a923318e41'
    />
  )
}

export default UmamiAnalytics
