import GlobalNav from '@/components/GlobalNav'
import { sections } from '@/lib/sections'

const navSections = sections
  .filter((section) => section.id !== 'intro')
  .slice()
  .sort((a, b) => a.order - b.order)

export default function FigmaGlobalNavPage() {
  return (
    <main
      style={{
        minHeight: '1400px',
        background: '#f4f1ea',
        position: 'relative',
      }}
    >
      <GlobalNav activeSectionId="over" />

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '1400px',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {navSections.map((section, index) => (
          <div
            key={section.id}
            id={section.id}
            style={{
              position: 'absolute',
              top: `${120 + index * 180}px`,
              left: 0,
              width: '100%',
              height: '1px',
            }}
          />
        ))}
      </div>
    </main>
  )
}
