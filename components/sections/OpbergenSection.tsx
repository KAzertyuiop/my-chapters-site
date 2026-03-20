import ContentBlock from '@/components/ContentBlock'

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
              <strong>Het lastige</strong> is dat een daktent best plat blijft liggen. Zeker
              hardshell modellen.
            </p>
            <p>Dat neemt wel wat plaats in. Vaak op plekken waar het vloeroppervlak net waardevol is:</p>
            <ul>
              <li>Garage</li>
              <li>Schuur</li>
              <li>Tuinhuis</li>
              <li>Kelder</li>
              <li>...</li>
            </ul>
            <div
              aria-hidden="true"
              style={{
                width: '100%',
                borderTop: '1px solid var(--color-grey)',
              }}
            />
            <p>
              Door in de hoogte te gaan helpt de <strong>tentdrager</strong> de vloer vrij te
              houden:
            </p>
            <ul>
              <li>Fietsen</li>
              <li>Karren</li>
              <li>Buggies</li>
              <li>Grasmaaiers</li>
              <li>Kruiwagens</li>
              <li>Kratten</li>
              <li>...</li>
            </ul>
            <p>Het kan er allemaal nog onder.</p>
          </>
        }
        stickyContent={
          <div
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--color-grey)',
            }}
          />
        }
      />
    </>
  )
}
