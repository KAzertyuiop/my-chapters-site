import ContentBlock from '@/components/ContentBlock'

export default function KoopSection() {
  return (
    <>
      <h2>Step-by-step kopen</h2>
      <p>Alles over hoe bestellen</p>
      <ContentBlock
        title="Bestellen"
        description="Dit is een test van de ContentBlock integratie."
        buttons={['Meer info', 'Specificaties', 'Contact']}
      />
    </>
  )
}