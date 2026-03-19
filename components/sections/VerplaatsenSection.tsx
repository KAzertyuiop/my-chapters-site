import ContentBlock from '@/components/ContentBlock'

export default function VerplaatsenSection() {
  return (
    <>
      <ContentBlock
        title="Verplaatsen"
      />
      <ContentBlock
        description={
          <>
            <p className="u-type-larger-semi">Titel</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rhoncus pretium
              posuere. Curabitur tempor, odio nec feugiat euismod, ex massa tempor nulla, nec
              placerat elit justo non est.
            </p>
          </>
        }
        buttons={[
          { label: 'Button', href: '/meer-info' },
          { label: 'Button', href: '/specificaties' },
          { label: 'Button', href: '/contact' },
        ]}
      />
    </>
  )
}
