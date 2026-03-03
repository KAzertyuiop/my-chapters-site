import ContentBlock from '@/components/ContentBlock'

export default function OpslagSection() {
  return (
    <>
      <ContentBlock
        title="Bewaren"
        description="Dit is een test van de ContentBlock integratie."
        buttons={['Meer info', 'Specificaties', 'Contact']}
      />
    </>
  )
}