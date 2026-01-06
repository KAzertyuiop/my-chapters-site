'use client'

import { useEffect, useMemo, useRef } from 'react'
import styles from './GlobalNav.module.css'
import { sections } from '@/lib/sections'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

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
  barRefs.current = []

  const anchorY = useRef<number[]>([])

  useEffect(() => {
    if (!navSections.length) return

    let ctx: any
    let raf = 0

    ;(async () => {
      const gsapMod = await import('gsap')
      const stMod = await import('gsap/ScrollTrigger')
      const gsap = (gsapMod as any).gsap || (gsapMod as any).default
      const ScrollTrigger = (stMod as any).ScrollTrigger || (stMod as any).default
      gsap.registerPlugin(ScrollTrigger)

      const measureAnchors = () => {
        anchorY.current = navSections.map((s) => {
          // Anchor at the TOP of the section so the bar peaks when the section top hits the focus line
          const el = document.getElementById(s.id)
          if (!el) return 0

          const r = el.getBoundingClientRect()
          // viewport -> document coords (top edge)
          return window.scrollY + r.top
        })
      }

      const updateBars = () => {
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          // Match your ScrollTrigger focus line: top 20%
          const focus = window.scrollY + window.innerHeight * 0.2

          const ys = anchorY.current
          const n = ys.length
          if (n === 0) return

          // Find the segment [i0, i1] that focus is between
          // (ys are in order, because navSections are in order)
          let i0 = 0
          while (i0 < n - 1 && focus > ys[i0 + 1]) i0++
          const i1 = Math.min(i0 + 1, n - 1)

          const y0 = ys[i0]
          const y1 = ys[i1]
          const seg = Math.max(1, y1 - y0)

          // t = 0..1 progress through current segment
          const tRaw = clamp((focus - y0) / seg, 0, 1)
          const t = smoothstep(0, 1, tRaw)

          // ✅ continuous index (no snapping)
          const continuousIndex = clamp(i0 + t, 0, n - 1)

          // Shape settings
          const maxScale = 1.0
          const minScale = 0.14
          const stepDrop = 0.16 // larger = sharper arrow

          // Optional: make it feel “softer” (reduces harshness)
          const gamma = 1.15 // >1 makes falloff a bit stronger

          for (let i = 0; i < n; i++) {
            const bar = barRefs.current[i]
            if (!bar) continue

            const d = Math.abs(i - continuousIndex) // fractional distance
            const base = clamp(maxScale - d * stepDrop, minScale, maxScale)

            // slight curve to feel more “designed”
            const v = clamp(Math.pow(base, gamma), minScale, maxScale)

            bar.style.transform = `scaleX(${v})`
            // bar.style.opacity = String(0.25 + (v - minScale) / (maxScale - minScale) * 0.75)
          }
        })
      }

      ctx = gsap.context(() => {
        const onRefresh = () => {
          measureAnchors()
          updateBars()
        }

        measureAnchors()
        updateBars()

        ScrollTrigger.addEventListener('refresh', onRefresh)

        ScrollTrigger.create({
          start: 0,
          end: () => ScrollTrigger.maxScroll(window),
          onUpdate: updateBars,
        })

        ScrollTrigger.refresh()

        return () => {
          ScrollTrigger.removeEventListener('refresh', onRefresh)
        }
      })
    })()

    return () => {
      cancelAnimationFrame(raf)
      ctx?.revert?.()
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