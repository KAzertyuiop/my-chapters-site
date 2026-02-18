'use client'

import posthog from 'posthog-js'
import styles from './WhatsAppLink.module.css'

const PHONE = '32474403450'

type WhatsAppLinkProps = {
  activeSectionId: string | null
  isVisible: boolean
}

export default function WhatsAppLink({ activeSectionId, isVisible }: WhatsAppLinkProps) {
  const href = `https://wa.me/${PHONE}`

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
      className={`${styles.whatsapp} ${isVisible ? styles.visible : styles.hidden}`}
      onClick={handleClick}
      aria-label="WhatsApp bubble"
    >
      WhatsApp
    </a>
  )
}