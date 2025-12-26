import SinglePage from '../../components/SinglePage'

export const metadata = {
  title: 'Chapter 2 – Chapter 2',
  description: 'This is chapter 2',
  openGraph: {
    title: 'Chapter 2 – Chapter 2',
    description: 'This is chapter 2',
    url: 'https://example.com/chapter-2',
  },
}

export default function Chapter2Page() {
  return <SinglePage scrollToId="chapter-2" />
}
