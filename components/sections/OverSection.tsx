import EmojiFeedback from "../EmojiFeedback";
import ContentBlock from '@/components/ContentBlock'

export default function OverSection() {
  return (
    <>
      <h2>Over</h2>
      <p>Over alles</p>
      <EmojiFeedback
        sectionId="pricing"
        sectionLabel="Pricing section"
      />
      <ContentBlock
        title="Bestellen"
        description="Dit is een test van de ContentBlock integratie."
      />
    </>
  )
}
