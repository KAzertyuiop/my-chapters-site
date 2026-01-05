'use client'

import posthog from 'posthog-js'
import styles from './WhatsAppLink.module.css'

const PHONE = '32474403450'

type WhatsAppLinkProps = {
  activeSectionId: string | null
}

export default function WhatsAppLink({
  activeSectionId,
}: WhatsAppLinkProps) {
  const href = `https://wa.me/${PHONE}`
  
console.log('WhatsApp active section:', activeSectionId)

  const handleClick = () => {
    posthog.capture('whatsapp_contact_click', {
      placement: 'global',
      section_id: activeSectionId ?? 'unknown',
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsapp}
      onClick={handleClick}
      aria-label="WhatsApp bubble"
    >
      WhatsApp
    </a>
  )
}