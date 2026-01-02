import WhatsAppLink from '@/components/WhatsAppLink'

export default function OverzichtSection() {
  return (
    <>
      <h2>Overzicht</h2>
      <p>Alles over hoe overzicht</p>
      <WhatsAppLink
        phone="32474403450"
        message="Lorem ipsum default message"
        className="whatsapp-link"
        sectionId="overzicht"
        linkLabel="General inquiry"
      >
        Reach out
      </WhatsAppLink>
    </>
  )
}