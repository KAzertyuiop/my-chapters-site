'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import posthog from 'posthog-js'

import MainStart from '@/components/MainStart'
import WhatsAppLink from './WhatsAppLink'
import GlobalNav from './GlobalNav'
import { sections } from '@/lib/sections'

const orderedSections = sections.slice().sort((a, b) => a.order - b.order)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  const viewedSections = useRef<Set<string>>(new Set())

  // ✅ hydration-safe: no window access here
  const [activeSectionId, setActiveSectionId] = useState<string | null>(() => {
    return (scrollToId || 'intro').trim() || 'intro'
  })

  const allSectionIds = useMemo(() => ['intro', ...orderedSections.map((s) => s.id)], [])

  const scrollToSection = (id: string, behavior: ScrollBehavior) => {
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior, block: 'start' })
  }

  // ✅ Deep-link entry (instant), from prop OR URL path
  useLayoutEffect(() => {
    const pathId = typeof window !== 'undefined' ? window.location.pathname.replace(/^\//, '') : ''
    const targetId = (scrollToId || pathId || '').trim()

    // Prevent browser/Next scroll restoration from overriding our jump
    const prevRestoration =
      'scrollRestoration' in window.history ? window.history.scrollRestoration : undefined
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    if (!targetId) {
      setActiveSectionId('intro')
      return () => {
        if (prevRestoration && 'scrollRestoration' in window.history) {
          window.history.scrollRestoration = prevRestoration
        }
      }
    }

    setActiveSectionId(targetId)

    let cancelled = false
    const startedAt = performance.now()

    const tryScroll = () => {
      if (cancelled) return

      const el = document.getElementById(targetId)
      if (el) {
        // Force an instant jump even if global CSS has `scroll-behavior: smooth`.
        const html = document.documentElement
        const prevScrollBehavior = html.style.scrollBehavior
        html.style.scrollBehavior = 'auto'

        // Use explicit top + double rAF to run after any framework scroll adjustments
        const top = window.scrollY + el.getBoundingClientRect().top
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top, behavior: 'auto' })
            html.style.scrollBehavior = prevScrollBehavior
          })
        })
        return
      }

      if (performance.now() - startedAt < 2000) {
        requestAnimationFrame(tryScroll)
      }
    }

    requestAnimationFrame(tryScroll)

    return () => {
      cancelled = true
      if (prevRestoration && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = prevRestoration
      }
    }
  }, [scrollToId])

  // future smooth navigation hook
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ id: string; behavior?: ScrollBehavior }>
      const id = ce.detail?.id
      if (!id) return
      scrollToSection(id, ce.detail.behavior ?? 'smooth')
    }
    window.addEventListener('navigateToSection', handler as EventListener)
    return () => window.removeEventListener('navigateToSection', handler as EventListener)
  }, [])

  // IO dominance
  useEffect(() => {
    const elements = allSectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    if (!elements.length) return

    const ratios = new Map<string, number>()
    const activeRef = { current: activeSectionId }

    const DOMINANCE = 0.6
    const MARGIN = 0.12
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

    const pickActive = () => {
      const currentId = activeRef.current
      const currentRatio = currentId ? ratios.get(currentId) ?? 0 : 0

      let bestId: string | null = null
      let bestRatio = -1

      for (const [id, r] of ratios.entries()) {
        if (r > bestRatio) {
          bestRatio = r
          bestId = id
        }
      }
      if (!bestId) return

      if (!currentId) {
        activeRef.current = bestId
        setActiveSectionId(bestId)
        return
      }

      const shouldSwitch =
        bestId !== currentId && (bestRatio >= DOMINANCE || bestRatio > currentRatio + MARGIN)

      if (shouldSwitch) {
        activeRef.current = bestId
        setActiveSectionId(bestId)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id
          ratios.set(id, entry.intersectionRatio)
        }
        pickActive()
      },
      { root: null, threshold: thresholds }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSectionIds])

  // URL + analytics
  useEffect(() => {
    if (!activeSectionId) return

    const path = activeSectionId === 'intro' ? '/' : `/${activeSectionId}`
    window.history.replaceState(null, '', path)

    if (activeSectionId === 'intro') {
      if (!viewedSections.current.has('intro')) {
        viewedSections.current.add('intro')
        posthog.capture('intro_section_viewed', {
          section_id: 'intro',
          section_label: 'Introduction',
        })
      }
      return
    }

    const s = orderedSections.find((sec) => sec.id === activeSectionId)
    if (!s) return

    if (!viewedSections.current.has(s.id)) {
      viewedSections.current.add(s.id)
      posthog.capture('section_viewed', {
        section_id: s.id,
        section_label: s.title?.en || s.id,
        section_order: s.order,
      })
    }
  }, [activeSectionId])

  return (
    <>
      <GlobalNav activeSectionId={activeSectionId} />
      <WhatsAppLink activeSectionId={activeSectionId} />

      <main>
        <section id="intro" className="section">
          <MainStart />
        </section>

        {orderedSections.map((section) => {
          const SectionComponent = section.Component
          return (
            <section key={section.id} id={section.id} className="section">
              <SectionComponent />
            </section>
          )
        })}
      </main>
    </>
  )
}