import ContentBlock from '../ContentBlock/ContentBlock'

export default function MeevoerenSection() {
  return (
    <>
      <ContentBlock
        title="Meevoeren"
        description={
          <>
            <p>Demonteer tot een <strong>plat pakket</strong>. IKEA style. Past in elk autokoffer.</p>
          </>
        }
        buttons={[
          { label: 'Meer info', href: '/meer-info' },
          { label: 'Specificaties', href: '/specificaties' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <ContentBlock
        variant="stickyScrollerReverse"
        description={
          <>
            <p><strong>Important:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.</p>
            <ul>
              <li>First point</li>
              <li>Second point</li>
            </ul>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec placerat elit justo non est.</p>
          </>
        }
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
