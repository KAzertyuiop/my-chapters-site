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
            <p className="u-type-huge">😬</p>
            <p>
              <strong>Het lastige</strong> is dat een ongebruikte daktent idealiter horizontaal blijft liggen. Zeker hardshell modellen.
            </p>
            <p>Dat neemt wel wat ruimte in.</p>
            <p>Vaak op plekken waar het vloeroppervlak waardevol is:</p>
            <ul>
              <li>Garage</li>
              <li>Schuur</li>
              <li>Tuinhuis</li>
              <li>Kelder</li>
              <li>...</li>
            </ul>
            <p className="u-type-huge">💡</p>
            <p>
              Door in de hoogte te gaan helpt <strong>onze tentdrager</strong> de vloer net vrij te houden:
            </p>
            <ul>
              <li>Garage</li>
              <li>Schuur</li>
              <li>Tuinhuis</li>
              <li>Kelder</li>
              <li>...</li>
            </ul>
            <p>Het kan er probleemloos onder/</p>
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
