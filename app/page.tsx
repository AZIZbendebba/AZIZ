import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import GroupePresentation from '@/components/sections/GroupePresentation'
import Secteurs from '@/components/sections/Secteurs'
import Matiere from '@/components/sections/Matiere'
import Realisations from '@/components/sections/Realisations'
import Process from '@/components/sections/Process'
import Confiance from '@/components/sections/Confiance'
import ContactCTA from '@/components/sections/ContactCTA'
import { siteConfig } from '@/lib/data/seo'

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.baseline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <GroupePresentation />
      <Secteurs />
      <Matiere />
      <Realisations />
      <Process />
      <Confiance />
      <ContactCTA />
    </>
  )
}
