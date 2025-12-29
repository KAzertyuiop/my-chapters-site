import type { ComponentType } from 'react'

import GebruikSection from '@/components/sections/GebruikSection'
import KarSection from '@/components/sections/KarSection'
import KoopSection from '@/components/sections/KoopSection'
import KraanSection from '@/components/sections/KraanSection'
import OpslagSection from '@/components/sections/OpslagSection'
import OverSection from '@/components/sections/OverSection'
import OverzichtSection from '@/components/sections/OverzichtSection'
import TransportSection from '@/components/sections/TransportSection'



export type Locale = 'en' | 'nl'

export type Section = {
  id: string
  order: number
  Component: ComponentType

  title: Record<Locale, string>
  description: Record<Locale, string>

  og: {
    title?: Record<Locale, string>
    description?: Record<Locale, string>
    image: string
  }
}

export const sections: Section[] = [
  {
    id: 'over',
    order: 1,
    Component: OverSection,

    title: {
      en: 'About',
      nl: 'Over',
    },
    description: {
      en: 'What the Tentcarrier is and why it exists.',
      nl: 'Wat de Tentcarrier is en waarom die bestaat.',
    },
    og: {
      image: '/og/over.png',
    },
  },

  {
    id: 'transport',
    order: 2,
    Component: TransportSection,

    title: {
      en: 'Assemble',
      nl: 'Monteren',
    },
    description: {
      en: 'How the Tentcarrier is assembled.',
      nl: 'Hoe de Tentcarrier wordt gemonteerd.',
    },
    og: {
      image: '/og/transport.png',
    },
  },

  {
    id: 'kar',
    order: 3,
    Component: KarSection,

    title: {
      en: 'Cart',
      nl: 'Winkelmand',
    },
    description: {
      en: 'Review your Tentcarrier configuration.',
      nl: 'Bekijk je Tentcarrier-configuratie.',
    },
    og: {
      image: '/og/kar.png',
    },
  },

  {
    id: 'kraan',
    order: 4,
    Component: KraanSection,

    title: {
      en: 'Crane',
      nl: 'Heffen',
    },
    description: {
      en: 'Crane the Tentcarrier effortlessly onto your vehicle.',
      nl: 'Til de Tentcarrier moeiteloos op je voertuig.',
    },
    og: {
      image: '/og/kraan.png',
    },
  },

  {
    id: 'koop',
    order: 7,
    Component: KoopSection,

    title: {
      en: 'Order',
      nl: 'Bestellen',
    },
    description: {
      en: 'Place your order securely.',
      nl: 'Plaats je bestelling veilig.',
    },
    og: {
      image: '/og/koop.png',
    },
  },

  {
    id: 'overzicht',
    order: 8,
    Component: OverzichtSection,

    title: {
      en: 'Recap',
      nl: 'Overzicht',
    },
    description: {
      en: 'A complete overview before purchase.',
      nl: 'Een volledig overzicht voor aankoop.',
    },
    og: {
      image: '/og/overzicht.png',
    },
  },

  {
    id: 'opslag',
    order: 5,
    Component: OpslagSection,

    title: {
      en: 'Store',
      nl: 'Winkel',
    },
    description: {
      en: 'Where to buy the Tentcarrier.',
      nl: 'Waar je de Tentcarrier kan kopen.',
    },
    og: {
      image: '/og/opslag.png',
    },
  },

  {
    id: 'gebruik',
    order: 6,
    Component: GebruikSection,

    title: {
      en: 'Use',
      nl: 'Gebruik',
    },
    description: {
      en: 'How to use the Tentcarrier safely and efficiently.',
      nl: 'Hoe je de Tentcarrier veilig en efficiënt gebruikt.',
    },
    og: {
      image: '/og/gebruik.png',
    },
  },
]
