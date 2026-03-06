import ContentBlock from '@/components/ContentBlock'

export default function KarSection() {
  return (
    <>
      <h2>Kar</h2>
      <p>Alles over hoe kar</p>
      <ContentBlock
        title="Kar"
        description="Alles over hoe kar werkt. Dit is een test van de ContentBlock integratie."
        buttons={[
          { label: 'Meer info', href: '/meer-info' },
          { label: 'Specificaties', href: '/specificaties' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
    </>
  )
}
