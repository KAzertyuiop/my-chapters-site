import WhatsAppLink from '@/components/WhatsAppLink'

export default function KraanSection() {
  return (
    <>
      <h2>Kraan</h2>
      <p>Alles over hoe kranen</p>
      <WhatsAppLink
        phone="32474403450"
        message="Different default message"
        className="whatsapp-link"
        sectionId="kraan"
        linkLabel="Crane inquiry"
      >
        Vraag over lift
      </WhatsAppLink>
    </>
  )
}