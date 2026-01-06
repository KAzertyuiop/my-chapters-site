'use client'

import styles from './GlobalNav.module.css'
import { sections } from '@/lib/sections'

type Props = {
  activeSectionId: string | null
}

export default function GlobalNav({ activeSectionId }: Props) {
  const label =
    activeSectionId === 'intro'
      ? 'Intro'
      : sections.find(s => s.id === activeSectionId)?.title?.en ||
        activeSectionId ||
        ''

  // Only show after leaving intro (optional, matches your earlier idea)
  const isVisible = !!activeSectionId && activeSectionId !== 'intro'

  return (
    <div className={`${styles.wrap} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.ribbon}>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  )
}