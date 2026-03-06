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
    </>
  )
}
