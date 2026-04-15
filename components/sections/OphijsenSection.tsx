import ContentBlock from '../ContentBlock/ContentBlock'

export default function OphijsenSection() {
  return (
    <>
      <ContentBlock
        title="Ophijsen"
        comboVariant="bigTitle"
      />
      <ContentBlock
        blockVariant="stickyScroller"
        stickyContentHeight="55vh"
        description={
          <>
            <p>
              <strong>Het lastige</strong> is dat een niet gebruikte daktent best horizontaal blijft
              liggen. Zeker hardshell modellen.
            </p>
            <p>Dat neemt wel wat plaats in.</p>
            <p>Vaak op plekken waar het vloeroppervlak net waardevol is:</p>
            <ul>
              <li>Garage</li>
              <li>Schuur</li>
              <li>Tuinhuis</li>
              <li>Kelder</li>
              <li>...</li>
            </ul>
            <p>
              Door in de hoogte te gaan helpt de <strong>tentdrager</strong> de vloer vrij te
              houden:
            </p>
            <ul>
              <li>Garage</li>
              <li>Schuur</li>
              <li>Tuinhuis</li>
              <li>Kelder</li>
              <li>...</li>
            </ul>
            <p>Het kan er probleemloos onder</p>
          </>
        }
        stickyContent={
          <div
            style={{
              width: '100%',
              height: '100%',
              background: '#d9d9d9',
            }}
          />
        }
      />
    </>
  )
}
