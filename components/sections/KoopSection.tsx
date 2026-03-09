import ContentBlock from '@/components/ContentBlock'

export default function KoopSection() {
  return (
    <>
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
