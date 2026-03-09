import EmojiFeedback from "../EmojiFeedback";
import ContentBlock from '@/components/ContentBlock'

export default function OverSection() {
  return (
    <>
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
