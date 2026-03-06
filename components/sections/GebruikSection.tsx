import ContentBlock from '@/components/ContentBlock'

export default function GebruikSection() {
  return (
    <>
      <h2>Gebruik</h2>
      <p>Alles over hoe gebruiken</p>
      <div>
        Geen kraan nodig. Geen zwaar tilwerk.
      </div>
      <ContentBlock
        title="Openen"
        description="Dit is een test van de ContentBlock integratie."
        buttons={[
          { label: 'Meer info', href: '/meer-info' },
          { label: 'Specificaties', href: '/specificaties' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <ContentBlock
        variant="stickyScroller"
        description={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.`}
        stickyVisualHeight="300px"
        stickyVisual={
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
