'use client'

import posthog from 'posthog-js'

type WhatsAppLinkProps = {
  phone: string
  message: string
  children: React.ReactNode
  className?: string
  sectionId?: string
  linkLabel?: string
}

export default function WhatsAppLink({
  phone,
  message,
  children,
  className,
  sectionId,
  linkLabel,
}: WhatsAppLinkProps) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  const handleClick = () => {
    posthog.capture('whatsapp_contact_clicked', {
      phone_number: phone,
      message_template: message,
      section_id: sectionId,
      link_label: linkLabel,
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}