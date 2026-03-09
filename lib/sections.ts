import type { ComponentType } from 'react'

import OpenenSection from '@/components/sections/OpenenSection'
import VerplaatsenSection from '@/components/sections/VerplaatsenSection'
import KoopSection from '@/components/sections/KoopSection'
import OphijsenSection from '@/components/sections/OphijsenSection'
import OpbergenSection from '@/components/sections/OpbergenSection'
import OverSection from '@/components/sections/OverSection'
import OverzichtSection from '@/components/sections/OverzichtSection'
import MeevoerenSection from '@/components/sections/MeevoerenSection'



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
      image: '/og/over2.png',
    },
  },

  {
    id: 'meevoeren',
    order: 2,
    Component: MeevoerenSection,

    title: {
      en: 'Meevoeren',
      nl: 'Meevoeren',
    },
    description: {
      en: 'How the Tentcarrier is assembled.',
      nl: 'Hoe de Tentcarrier wordt gemonteerd.',
    },
    og: {
      image: '/og/transport2.png',
    },
  },

  {
    id: 'verplaatsen',
    order: 3,
    Component: VerplaatsenSection,

    title: {
      en: 'Verplaatsen',
      nl: 'Verplaatsen',
    },
    description: {
      en: 'Review your Tentcarrier configuration.',
      nl: 'Bekijk je Tentcarrier-configuratie.',
    },
    og: {
      image: '/og/kar2.png',
    },
  },

  {
    id: 'ophijsen',
    order: 4,
    Component: OphijsenSection,

    title: {
      en: 'Ophijsen',
      nl: 'Ophijsen',
    },
    description: {
      en: 'Crane the Tentcarrier effortlessly onto your vehicle.',
      nl: 'Til de Tentcarrier moeiteloos op je voertuig.',
    },
    og: {
      image: '/og/kraan2.png',
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
      image: '/og/koop2.png',
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
      image: '/og/overzicht2.png',
    },
  },

  {
    id: 'opbergen',
    order: 5,
    Component: OpbergenSection,

    title: {
      en: 'Opbergen',
      nl: 'Opbergen',
    },
    description: {
      en: 'Where to buy the Tentcarrier.',
      nl: 'Waar je de Tentcarrier kan kopen.',
    },
    og: {
      image: '/og/opslag3.png',
    },
  },

  {
    id: 'openen',
    order: 6,
    Component: OpenenSection,

    title: {
      en: 'Openen',
      nl: 'Openen',
    },
    description: {
      en: 'How to use the Tentcarrier safely and efficiently.',
      nl: 'Hoe je de Tentcarrier veilig en efficiënt gebruikt.',
    },
    og: {
      image: '/og/gebruik2.png',
    },
  },
]
