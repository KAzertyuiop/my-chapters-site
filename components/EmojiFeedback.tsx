'use client'

import { useState } from 'react'
import posthog from 'posthog-js'
import styles from './EmojiFeedback.module.css'

type Props = {
  sectionId: string
  sectionLabel?: string
}

const EMOJI_SCALE = [
  { emoji: '😒', value: 1, label: 'Very negative' },
  { emoji: '🤨', value: 2, label: 'Confused / skeptical' },
  { emoji: '🤔', value: 3, label: 'Neutral / thinking' },
  { emoji: '😮', value: 4, label: 'Positively surprised' },
  { emoji: '🤩', value: 5, label: 'Very positive' },
]

export default function EmojiFeedback({ sectionId, sectionLabel }: Props) {
  const [selected, setSelected] = useState<number | null>(null)

  const handleClick = (emoji: string, value: number) => {
    if (selected === value) {
      setSelected(null)
      return
    }

    setSelected(value)

    posthog.capture('section_feedback', {
      section_id: sectionId,
      section_label: sectionLabel,
      emoji,
      value,
    })
  }

  return (
    <div className={styles.container}>
      {EMOJI_SCALE.map(({ emoji, value, label }) => {
        const isSelected = selected === value
        const isDisabled = selected !== null && !isSelected

        return (
          <button
            key={emoji}
            onClick={() => handleClick(emoji, value)}
            disabled={isDisabled}
            aria-label={label}
            className={[
              styles.button,
              isSelected && styles.selected,
              isDisabled && styles.disabled,
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {emoji}
          </button>
        )
      })}
    </div>
  )
}