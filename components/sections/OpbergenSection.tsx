import ContentBlock from '@/components/ContentBlock'

const opbergenVisualUrl = 'https://www.figma.com/api/mcp/asset/45472fdf-d941-4b21-b585-6250d6dd7bfc'

export default function OpbergenSection() {
  return (
    <>
      <ContentBlock
        title="Opbergen"
      />
      <ContentBlock
        variant="stickyScroller"
        stickyContentHeight="55vh"
        description={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus{' '}
              <strong>pretium</strong> posuere. Curabitur tempor, odio nec feugiat euismod, ex
              massa tempor nulla, nec placerat elit justo non est.
            </p>
            <ul>
              <li>lkjlkjh</li>
              <li>lkjlkj</li>
              <li>mkjlkj</li>
            </ul>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium
              posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec
              placerat elit justo non est.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium
              posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec
              placerat elit justo non est.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium
              posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec
              placerat elit justo non est.
            </p>
          </>
        }
        stickyContent={
          <img
            src={opbergenVisualUrl}
            alt="Illustratie van een tentdrager met een fiets eronder"
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
          />
        }
      />
    </>
  )
}
