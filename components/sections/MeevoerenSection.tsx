import ContentBlock from '../ContentBlock/ContentBlock'

export default function MeevoerenSection() {
  return (
    <>
      <ContentBlock
        title="Meevoeren"
        comboVariant="bigTitle"
        description={
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium
              posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec
              placerat elit justo non est.
            </p>
          </>
        }
        buttons={[
          { label: 'Button', href: '/meer-info' },
          { label: 'Button', href: '/specificaties' },
          { label: 'Button', href: '/contact' },
        ]}
      />
      <ContentBlock
        blockVariant="stickyScrollerReverse"
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
        stickyContentHeight="300px"
        stickyContent={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#d9d9d9',
              border: '1px dashed #888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#555',
              fontSize: '14px',
            }}
          >
            Sticky visual placeholder
          </div>
        }
      />
    </>
  )
}
