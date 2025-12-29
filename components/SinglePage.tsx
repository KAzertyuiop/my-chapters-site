'use client'

import MainStart from '@/components/MainStart'
import { useEffect } from 'react'
import { sections } from '@/lib/sections'

const sectionIds = sections.map(s => s.id)

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  // Scroll to section on direct navigation
  useEffect(() => {
    if (!scrollToId) return

    const el = document.getElementById(scrollToId)
    el?.scrollIntoView({ behavior: 'smooth' })
  }, [scrollToId])

  // URL update on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const id = entry.target.id

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
