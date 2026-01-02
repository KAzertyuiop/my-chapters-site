# PostHog post-wizard report

The wizard has completed a deep integration of your Tentcarrier Next.js project. PostHog has been configured using the modern `instrumentation-client.ts` approach (recommended for Next.js 15.3+), with automatic pageview capture, exception tracking, and custom event instrumentation throughout the application.

## Summary of Changes

### Configuration Files
- **`.env.local`** - Updated PostHog host to `https://eu.i.posthog.com`
- **`instrumentation-client.ts`** - Created new file for PostHog initialization with `defaults: '2025-05-24'`, automatic exception capture, and debug mode in development
- **`lib/posthog.ts`** - Simplified to re-export posthog (initialization moved to instrumentation-client.ts)
- **`app/layout.tsx`** - Removed manual PostHog import (handled by instrumentation-client.ts)

### Component Updates
- **`components/WhatsAppLink.tsx`** - Added click tracking with section context
- **`components/SinglePage.tsx`** - Added section view tracking via IntersectionObserver
- **`components/EmojiFeedback.tsx`** - Updated import to use posthog-js directly
- **`components/sections/KraanSection.tsx`** - Added tracking props to WhatsApp link
- **`components/sections/OverzichtSection.tsx`** - Added tracking props to WhatsApp link

## Events Tracked

| Event Name | Description | File |
|------------|-------------|------|
| `intro_section_viewed` | User viewed the intro/landing section - top of funnel entry point | `components/SinglePage.tsx` |
| `section_viewed` | User scrolled to and viewed a specific product section - tracks engagement through the sales funnel | `components/SinglePage.tsx` |
| `whatsapp_contact_clicked` | User clicked on WhatsApp contact link to initiate a conversation - key conversion event for lead generation | `components/WhatsAppLink.tsx` |
| `section_feedback` | User provided emoji feedback on a section - sentiment tracking (pre-existing) | `components/EmojiFeedback.tsx` |

### Event Properties

**`section_viewed`**
- `section_id` - Unique identifier for the section
- `section_label` - Human-readable section name
- `section_order` - Order in the page flow

**`whatsapp_contact_clicked`**
- `phone_number` - WhatsApp phone number
- `message_template` - Pre-filled message
- `section_id` - Which section the link was in
- `link_label` - Description of the link purpose

**`section_feedback`**
- `section_id` - Section being rated
- `section_label` - Human-readable section name
- `emoji` - The emoji selected
- `value` - Numeric score (1-5)

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://eu.posthog.com/project/112151/dashboard/473578) - Core analytics dashboard with all insights

### Insights
- [Section Engagement Funnel](https://eu.posthog.com/project/112151/insights/fo7E9vn0) - Tracks user progression from intro to WhatsApp contact
- [WhatsApp Conversions by Section](https://eu.posthog.com/project/112151/insights/MU2Ox12L) - Breakdown of contact clicks by section
- [Section Views Over Time](https://eu.posthog.com/project/112151/insights/TkEEIJ4f) - Engagement trends over time
- [User Feedback Sentiment](https://eu.posthog.com/project/112151/insights/U1HPGa35) - Distribution of emoji feedback scores
- [Section Popularity Ranking](https://eu.posthog.com/project/112151/insights/ZbRscPxn) - Most viewed sections by total views

## Technical Notes

- PostHog is initialized via `instrumentation-client.ts` which is the recommended approach for Next.js 16.x
- Automatic pageview capture is enabled via `defaults: '2025-05-24'`
- Exception tracking is enabled via `capture_exceptions: true`
- Debug mode is automatically enabled in development
- Section views are deduplicated per session using a `useRef` Set to avoid duplicate events
