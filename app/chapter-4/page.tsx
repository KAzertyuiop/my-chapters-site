import SinglePage from '../../components/SinglePage'

export const metadata = {
  title: 'Chapter 4 – Chapter 4',
  description: 'This is chapter 4',
  openGraph: {
    title: 'Chapter 4 – Chapter 4',
    description: 'This is chapter 4',
    url: 'https://example.com/chapter-4',
  },
}

export default function Chapter4Page() {
  return <SinglePage scrollToId="chapter-4" />
}
