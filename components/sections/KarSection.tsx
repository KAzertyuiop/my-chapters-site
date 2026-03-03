import ContentBlock from '@/components/ContentBlock'

export default function KarSection() {
  return (
    <>
      <h2>Kar</h2>
      <p>Alles over hoe kar</p>
      <ContentBlock
        title="Kar"
        description="Alles over hoe kar werkt. Dit is een test van de ContentBlock integratie."
        buttons={['Meer info', 'Specificaties', 'Contact']}
      />
    </>
  )
}