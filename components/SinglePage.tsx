'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import posthog from 'posthog-js'

import MainStart from '@/components/MainStart'
import WhatsAppLink from './WhatsAppLink'
import { sections } from '@/lib/sections'

// Register GSAP plugins once (client-side)
gsap.registerPlugin(ScrollTrigger)

const sectionIds = sections.map(s => s.id)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  // Track which sections have been viewed in this session
  const viewedSections = useRef<Set<string>>(new Set())

  // Active section (single source of truth)
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  // Instant jump on deep link (NO smooth scroll)
  useEffect(() => {
    if (!scrollToId) return

    const el = document.getElementById(scrollToId)
    el?.scrollIntoView()
  }, [scrollToId])

  // GSAP ScrollTrigger: active section + URL + PostHog
  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    // Intro
    const introEl = document.getElementById('intro')
    if (introEl) {
      triggers.push(
        ScrollTrigger.create({
          trigger: introEl,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => {
            setActiveSectionId('intro')
            window.history.replaceState(null, '', '/')

            if (!viewedSections.current.has('intro')) {
              viewedSections.current.add('intro')
              posthog.capture('intro_section_viewed', {
                section_id: 'intro',
                section_label: 'Introduction',
              })
            }
          },
          onEnterBack: () => {
            setActiveSectionId('intro')
            window.history.replaceState(null, '', '/')
          },
        })
      )
    }

    // Sections
    sections.forEach(section => {
      const el = document.getElementById(section.id)
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center', // 🔑 top of section hits viewport center
          onEnter: () => {
            setActiveSectionId(section.id)
            window.history.replaceState(null, '', `/${section.id}`)

            if (!viewedSections.current.has(section.id)) {
              viewedSections.current.add(section.id)
              posthog.capture('section_viewed', {
                section_id: section.id,
                section_label: section.title?.en || section.id,
                section_order: section.order,
              })
            }
          },
          onEnterBack: () => {
            setActiveSectionId(section.id)
            window.history.replaceState(null, '', `/${section.id}`)
          },
        })
      )
    })

    return () => {
      triggers.forEach(t => t.kill())
    }
  }, [])

  return (
    <>
      {/* Uses GSAP-driven activeSectionId */}
      <WhatsAppLink activeSectionId={activeSectionId} />

      <main>
        <section id="intro" style={{ height: '200vh' }}>
          <MainStart />
        </section>

        {sections
          .slice()
          .sort((a, b) => a.order - b.order)
          .map(section => {
            const SectionComponent = section.Component

            return (
              <section
                key={section.id}
                id={section.id}
                style={{ height: '200vh' }}
              >
                <SectionComponent />
              </section>
            )
          })}
      </main>
    </>
  )
}
