'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import posthog from 'posthog-js'

import MainStart from '@/components/MainStart'
import WhatsAppLink from './WhatsAppLink'
import GlobalNav from './GlobalNav'
import { sections } from '@/lib/sections'

// Register GSAP plugins once (client-side)
gsap.registerPlugin(ScrollTrigger)

// ✅ single source of truth for order used in render + triggers
const orderedSections = sections.slice().sort((a, b) => a.order - b.order)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const viewedSections = useRef<Set<string>>(new Set())
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  // Prevent ScrollTrigger from rewriting the URL before the initial deep-link jump completes
  const initialJumpDone = useRef(false)

  // Capture the entry pathname once and avoid re-running the deep-link jump when we update the URL while scrolling.
  const initialPathIdRef = useRef<string | null>(null)
  const initialScrollHandledRef = useRef(false)

  // Instant jump on deep link (NO smooth scroll)
  // Run only on initial entry (or when scrollToId prop changes), not on our own router.replace() updates.
  useLayoutEffect(() => {
    if (initialPathIdRef.current === null) {
      initialPathIdRef.current = (pathname || '/').replace(/^\/+/, '').trim()
    }

    const targetId = (scrollToId || initialPathIdRef.current || '').trim()

    // Home route: nothing to jump to
    if (!targetId) {
      initialScrollHandledRef.current = true
      initialJumpDone.current = true
      return
    }

    // If we already handled the initial jump for the entry route, don't do it again.
    // (Prevents fighting URL updates while scrolling.)
    if (initialScrollHandledRef.current && !scrollToId) {
      initialJumpDone.current = true
      return
    }

    initialJumpDone.current = false

    let cancelled = false
    let frames = 0

    const tryScroll = () => {
      if (cancelled) return

      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        ScrollTrigger.refresh()
        initialScrollHandledRef.current = true
        initialJumpDone.current = true
        return
      }

      // Retry briefly while the DOM mounts (up to ~1s at 60fps)
      if (frames++ < 60) requestAnimationFrame(tryScroll)
      else {
        // Give up gracefully
        initialJumpDone.current = true
      }
    }

    requestAnimationFrame(tryScroll)

    return () => {
      cancelled = true
    }
  }, [scrollToId])

  // GSAP ScrollTrigger: active section + URL + PostHog
  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    const updateUrl = (id: string) => {
      // Avoid fighting the initial deep-link jump; the URL is already correct on entry.
      if (!initialJumpDone.current) return

      if (id === 'intro') router.replace('/', { scroll: false })
      else router.replace(`/${id}`, { scroll: false })
    }

    // Intro
    const introEl = document.getElementById('intro')
    if (introEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: introEl,
          start: 'top 20%',
          end: 'bottom 20%',
          onToggle: (self) => {
            if (!self.isActive) return

            setActiveSectionId('intro')
            updateUrl('intro')

            if (!viewedSections.current.has('intro')) {
              viewedSections.current.add('intro')
              posthog.capture('intro_section_viewed', {
                section_id: 'intro',
                section_label: 'Introduction',
              })
            }
          },
        })
      )
    }

    // ✅ Sections in correct order
    orderedSections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 20%',
          end: 'bottom 20%',
          onToggle: (self) => {
            if (!self.isActive) return

            setActiveSectionId(section.id)
            updateUrl(section.id)

            if (!viewedSections.current.has(section.id)) {
              viewedSections.current.add(section.id)
              posthog.capture('section_viewed', {
                section_id: section.id,
                section_label: section.title?.en || section.id,
                section_order: section.order,
              })
            }
          },
        })
      )
    })

    ScrollTrigger.refresh()

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [router])

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