import ContentBlock from '@/components/ContentBlock'

export default function OpenenSection() {
  return (
    <>
      <ContentBlock
        title="Openen"
        comboVariant="bigTitle"
      />
      <ContentBlock
        description={
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '24px',
              textAlign: 'left',
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  alignItems: 'flex-start',
                }}
              >
                <p className="u-type-larger-semi" style={{ width: '100%', margin: 0 }}>
                  Titel
                </p>
                <div
                  style={{
                    width: '100%',
                    borderTop: '1px solid var(--color-dark)',
                    paddingTop: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <p className="u-type-small" style={{ width: '100%', margin: 0 }}>
                    Lorem ipsum dolor sit
                  </p>
                  <p className="u-type-small" style={{ width: '100%', margin: 0 }}>
                    Lorem ipsum dolor consectetur sit
                  </p>
                  <p className="u-type-small" style={{ width: '100%', margin: 0 }}>
                    Lorem dolor consectetur
                  </p>
                </div>
              </div>
            ))}
          </div>
        }
      />
    </>
  )
}
