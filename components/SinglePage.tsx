'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import posthog from 'posthog-js'

import MainStart from '@/components/MainStart'
import WhatsAppLink from './WhatsAppLink'
import GlobalNav from './GlobalNav'
import { sections } from '@/lib/sections'

// Register GSAP plugins once (client-side)
gsap.registerPlugin(ScrollTrigger)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  const viewedSections = useRef<Set<string>>(new Set())
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)

  // ✅ single source of truth for order used in render + triggers
  const orderedSections = sections.slice().sort((a, b) => a.order - b.order)

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
          start: 'top 20%',
          end: 'bottom 20%',
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

    // ✅ Sections in correct order
    orderedSections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (!el) return

      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 20%',
          end: 'bottom 20%',
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
      triggers.forEach((t) => t.kill())
    }
  }, [orderedSections])

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