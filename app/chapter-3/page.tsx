import SinglePage from '../../components/SinglePage'

export const metadata = {
  title: 'Chapter 3 – Chapter 3',
  description: 'This is chapter 3',
  openGraph: {
    title: 'Chapter 3 – Chapter 3',
    description: 'This is chapter 3',
    url: 'https://example.com/chapter-3',
  },
}

export default function Chapter3Page() {
  return <SinglePage scrollToId="chapter-3" />
}
