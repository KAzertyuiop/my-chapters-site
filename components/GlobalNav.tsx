'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GlobalNav.module.css'
import { sections } from '@/lib/sections'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

// Register once (this file is a client component)
gsap.registerPlugin(ScrollTrigger)

export default function GlobalNav({ activeSectionId }: { activeSectionId: string | null }) {
  const label =
    activeSectionId === 'intro'
      ? 'Intro'
      : sections.find((s) => s.id === activeSectionId)?.title?.en || activeSectionId || ''

  const isVisible = !!activeSectionId && activeSectionId !== 'intro'

  const navSections = useMemo(() => {
    return sections
      .filter((s) => s.id !== 'intro')
      .slice()
      .sort((a, b) => a.order - b.order)
  }, [])

  const barRefs = useRef<(HTMLSpanElement | null)[]>([])

  const anchorY = useRef<number[]>([])

  const activeIdRef = useRef<string | null>(null)

  useEffect(() => {
    activeIdRef.current = activeSectionId
  }, [activeSectionId])

  useEffect(() => {
    if (!navSections.length) return

    let raf = 0

    const measureAnchors = () => {
      anchorY.current = navSections.map((s) => {
        const el = document.getElementById(s.id)
        if (!el) return 0
        const r = el.getBoundingClientRect()
        return window.scrollY + r.top
      })
    }

    const updateBars = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const focus = window.scrollY + window.innerHeight * 0.2

        const ys = anchorY.current
        const n = ys.length
        if (n === 0) return

        let i0 = 0
        while (i0 < n - 1 && focus > ys[i0 + 1]) i0++
        const i1 = Math.min(i0 + 1, n - 1)

        const y0 = ys[i0]
        const y1 = ys[i1]
        const seg = Math.max(1, y1 - y0)

        const tRaw = clamp((focus - y0) / seg, 0, 1)
        const t = smoothstep(0, 1, tRaw)
        const continuousIndex = clamp(i0 + t, 0, n - 1)

        const maxScale = 1.0
        const minScale = 0.14
        const stepDrop = 0.16
        const gamma = 1.15

        const activeId = activeIdRef.current

        for (let i = 0; i < n; i++) {
          const bar = barRefs.current[i]
          if (!bar) continue

          // Base scrub curve
          const d = Math.abs(i - continuousIndex)
          const base = clamp(maxScale - d * stepDrop, minScale, maxScale)
          let v = clamp(Math.pow(base, gamma), minScale, maxScale)

          // Force the active section to be the longest line
          if (activeId && navSections[i]?.id === activeId) v = maxScale

          bar.style.transform = `scaleX(${v})`
        }
      })
    }

    // Initial measure + update
    measureAnchors()
    updateBars()

    const onResize = () => {
      measureAnchors()
      updateBars()
    }

    window.addEventListener('resize', onResize)

    // One global scroll trigger for updates
    const st = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: () => {
        // Anchors can drift with content; keep it reasonably fresh
        measureAnchors()
        updateBars()
      },
    })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      st.kill()
    }
  }, [navSections])

  return (
    <div className={`${styles.wrap} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.ribbon}>
        <span className={styles.label}>/ {label}</span>

        <div className={styles.stack} aria-hidden="true">
          {navSections.map((s, idx) => (
            <span
              key={s.id}
              className={styles.stackLine}
              ref={(el) => {
                barRefs.current[idx] = el
              }}
              title={s.title?.en ?? s.id}
            />
          ))}
        </div>
      </div>
    </div>
  )
}