import SinglePage from '../../components/SinglePage'

export const metadata = {
  title: 'Chapter 5 – Chapter 5',
  description: 'This is chapter 5',
  openGraph: {
    title: 'Chapter 5 – Chapter 5',
    description: 'This is chapter 5',
    url: 'https://example.com/chapter-5',
  },
}

export default function Chapter5Page() {
  return <SinglePage scrollToId="chapter-5" />
}
