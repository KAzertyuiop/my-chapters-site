'use client'

import posthog from 'posthog-js'

type Props = {
  sectionId: string
  sectionLabel?: string
}

const emojis = [
  { emoji: '😒', value: 1 },
  { emoji: '🤨', value: 2 },
  { emoji: '🤔', value: 3 },
  { emoji: '😮', value: 4 },
  { emoji: '🤩', value: 5 },
]

const EMOJI_SCALE = [
  { emoji: '😒', value: 1, label: 'Very negative' },
  { emoji: '🤨', value: 2, label: 'Confused / skeptical' },
  { emoji: '🤔', value: 3, label: 'Neutral / thinking' },
  { emoji: '😮', value: 4, label: 'Positively surprised' },
  { emoji: '🤩', value: 5, label: 'Very positive' },
]

export default function EmojiFeedback({ sectionId, sectionLabel }: Props) {
  const handleClick = (emoji: string, value: number) => {
    posthog.capture('section_feedback', {
      section_id: sectionId,
      section_label: sectionLabel,
      emoji,
      value,
    })
  }

  return (
    <div className="flex items-center gap-3 text-2xl">
      {emojis.map(({ emoji, value }) => (
        <button
          key={emoji}
          onClick={() => handleClick(emoji, value)}
          className="hover:scale-110 transition"
          aria-label={`Feedback ${value}`}
        >
          {emoji}
        </button>
      ))}
    </div>
  )
}