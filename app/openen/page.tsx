import SinglePage from '@/components/SinglePage'
import { sections } from '@/lib/sections'
import type { Locale } from '@/lib/sections'

const locale: Locale = 'en'

const section = sections.find(s => s.id === 'openen')!

export const metadata = {
  title: section.title[locale],
  description: section.description[locale],
  openGraph: {
    title: section.title[locale],
    description: section.description[locale],
    url: `https://my-chapters-site.vercel.app/${section.id}`,
    images: [
      {
        url: section.og.image,
        width: 1200,
        height: 630,
        alt: section.title[locale],
      },
    ],
  },
}

export default function Page() {
  return <SinglePage scrollToId={section.id} />
}
