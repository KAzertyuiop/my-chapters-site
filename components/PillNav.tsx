'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'

import type { Locale } from '@/lib/sections'
import { sections } from '@/lib/sections'

import styles from './PillNav.module.css'

type PillNavProps = {
  activeSectionId: string | null
  locale?: Locale
  className?: string
  onNavigate?: (id: string) => void
}

type PillNavItem = {
  id: string
  label: string
  number?: number
}

const orderedSections = sections.slice().sort((a, b) => a.order - b.order)

export default function PillNav({
  activeSectionId,
  locale = 'nl',
  className,
  onNavigate,
}: PillNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const panelId = useId()

  const items = useMemo<PillNavItem[]>(() => {
    const titleFor = (id: string) => orderedSections.find((section) => section.id === id)?.title[locale] ?? id
    const numberedIds = ['meevoeren', 'verplaatsen', 'ophijsen', 'opbergen', 'openen']
    const secondaryIds = ['over', 'koop', 'overzicht']

    return [
      { id: 'intro', label: 'Intro' },
      ...numberedIds.map((id, index) => ({
        id,
        label: titleFor(id),
        number: index + 1,
      })),
      ...secondaryIds.map((id) => ({
        id,
        label: titleFor(id),
      })),
    ]
  }, [locale])
  const isVisible = !!activeSectionId && activeSectionId !== 'intro'

  const activeItem = activeSectionId ? items.find((item) => item.id === activeSectionId) ?? null : null
  const activeLabel = activeItem?.label ?? 'Intro'

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (id: string) => {
    setIsOpen(false)

    if (onNavigate) {
      onNavigate(id)
      return
    }

    window.dispatchEvent(
      new CustomEvent('navigateToSection', {
        detail: { id, behavior: 'smooth' },
      })
    )
  }

  return (
    <div
      ref={rootRef}
      className={[
        styles.wrap,
        isVisible ? styles.visible : styles.hidden,
        isOpen ? styles.open : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className={styles.shell}>
        {!isOpen ? (
          <button
            type="button"
            className={styles.trigger}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className={`${styles.activeLabel} u-type-regular-semi`}>{activeLabel}</span>
            <img src="/chevron.svg" alt="" className={styles.chevron} aria-hidden="true" />
          </button>
        ) : null}

        <div
          id={panelId}
          className={styles.panel}
          data-open={isOpen ? 'true' : 'false'}
          aria-hidden={isOpen ? 'false' : 'true'}
        >
          <ol className={styles.list}>
            {items.map((item) => {
              const isActive = item.id === activeSectionId

              return (
                <li key={item.id} className={styles.item}>
                  <button
                    type="button"
                    className={[
                      styles.itemButton,
                      item.number ? styles.itemButtonNumbered : null,
                      isActive ? styles.itemButtonActive : null,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelect(item.id)}
                  >
                    {item.number ? (
                      <span className={styles.numberBadge}>
                        <span className={`${styles.numberValue} u-type-small-semi`}>{item.number}</span>
                      </span>
                    ) : null}
                    <span className={styles.itemLabel}>{item.label}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
