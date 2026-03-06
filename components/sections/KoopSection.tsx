import ContentBlock from '@/components/ContentBlock'

export default function KoopSection() {
  return (
    <>
      <h2>Step-by-step kopen</h2>
      <p>Alles over hoe bestellen</p>
      <ContentBlock
        title="Bestellen"
        buttons={[
          { label: 'Meer info', href: '/meer-info' },
          { label: 'Specificaties', href: '/specificaties' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
    </>
  )
}
