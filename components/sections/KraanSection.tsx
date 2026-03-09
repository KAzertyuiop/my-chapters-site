import ContentBlock from '../ContentBlock/ContentBlock'

export default function KraanSection() {
  return (
    <>
      <ContentBlock
        title="Optillen"
        buttons={[
          { label: 'Meer info', href: '/meer-info' },
          { label: 'Specificaties', href: '/specificaties' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
    </>
  )
}