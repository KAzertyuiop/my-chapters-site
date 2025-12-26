import SinglePage from '../../components/SinglePage'

export const metadata = {
  title: 'Chapter 1 – The Beginning',
  description: 'This is chapter 1',
  openGraph: {
    title: 'Chapter 1 – The Beginning',
    description: 'This is chapter 1',
    url: 'https://example.com/chapter-1',
  },
}

export default function Chapter1Page() {
  return <SinglePage scrollToId="chapter-1" />
}
