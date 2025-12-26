'use client'

import { useEffect } from 'react'

const chapters = [
  'chapter-1',
  'chapter-2',
  'chapter-3',
  'chapter-4',
  'chapter-5',
  'chapter-6',
]

export default function SinglePage({ scrollToId }: { scrollToId?: string }) {
  // Scroll to chapter on direct navigation
  useEffect(() => {
    if (scrollToId) {
      const el = document.getElementById(scrollToId)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [scrollToId])

  // URL update on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id

            if (chapters.includes(id)) {
              window.history.replaceState(null, '', `/${id}`)
            }

            if (id === 'intro') {
              window.history.replaceState(null, '', '/')
            }
          }
        })
      },
      { threshold: 0.6 }
    )

    const intro = document.getElementById('intro')
    if (intro) observer.observe(intro)

    chapters.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main>
      {/* Intro / Homepage */}
      <section id="intro" style={{ height: '100vh' }}>
        <h1>Intro</h1>
      </section>

      {/* Chapters */}
      {chapters.map(id => (
        <section key={id} id={id} style={{ height: '100vh' }}>
          <h1>{id.replace('-', ' ')}</h1>
        </section>
      ))}
    </main>
  )
}
