'use client'

import MainStart from '@/components/MainStart'
import { useEffect, useRef } from 'react'
import { sections } from '@/lib/sections'
import posthog from 'posthog-js'

const sectionIds = sections.map(s => s.id)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  // Track which sections have been viewed in this session to avoid duplicate events
  const viewedSections = useRef<Set<string>>(new Set())

  // Scroll to section on direct navigation
  useEffect(() => {
    if (!scrollToId) return

    const el = document.getElementById(scrollToId)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollToId])

  // URL update on scroll + PostHog section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const id = entry.target.id

          // Track section view only once per session
          if (!viewedSections.current.has(id)) {
            viewedSections.current.add(id)

            if (id === 'intro') {
              posthog.capture('intro_section_viewed', {
                section_id: 'intro',
                section_label: 'Introduction',
              })
            } else {
              const sectionData = sections.find(s => s.id === id)
              posthog.capture('section_viewed', {
                section_id: id,
                section_label: sectionData?.title?.en || id,
                section_order: sectionData?.order,
              })
            }
          }

          if (id === 'intro') {
            window.history.replaceState(null, '', '/')
            return
          }

          if (sectionIds.includes(id)) {
            window.history.replaceState(null, '', `/${id}`)
          }
        })
      },
      { threshold: 0.6 }
    )

    const intro = document.getElementById('intro')
    if (intro) observer.observe(intro)

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return (
    <main>
      <section id="intro" style={{ height: '100vh' }}>
        <MainStart/>
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
              style={{ height: '100vh' }}
            >
              <SectionComponent />
            </section>
          )
        })}
    </main>
  )
}
