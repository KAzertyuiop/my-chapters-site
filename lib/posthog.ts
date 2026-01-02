// PostHog is initialized in instrumentation-client.ts (Next.js 15.3+)
// This file re-exports posthog for use in components
import posthog from 'posthog-js'

export default posthog