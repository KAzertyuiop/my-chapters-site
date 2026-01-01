'use client'

import posthog from 'posthog-js'



console.log(
  'POSTHOG KEY:',
  process.env.NEXT_PUBLIC_POSTHOG_KEY
)



if (typeof window !== 'undefined') {
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY!,
    {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      capture_pageview: true, // important: manual control
    }
  )
}

export default posthog