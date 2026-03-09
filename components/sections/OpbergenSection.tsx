import ContentBlock from '@/components/ContentBlock'

export default function OpbergenSection() {
  return (
    <>
      <ContentBlock
        title="Bewaren"
        titleClassName="u-type-larger"
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
