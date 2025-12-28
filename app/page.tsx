import SinglePage from '@/components/SinglePage'
import { mainpagetexts } from '@/lib/mainpage'
import type { Locale } from '@/lib/sections'

const locale: Locale = 'en'

export const metadata = {
  title: mainpagetexts.title[locale],
  description: mainpagetexts.description[locale],
  openGraph: {
    title: mainpagetexts.title[locale],
    description: mainpagetexts.description[locale],
    url: 'https://yourdomain.com',
    images: [
      {
        url: mainpagetexts.og.image,
        width: 1200,
        height: 630,
        alt: mainpagetexts.title[locale],
      },
    ],
  },
}

export default function Page() {
  return <SinglePage />
}
