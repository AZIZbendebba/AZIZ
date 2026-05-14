import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import UniversGrid from '@/components/sections/UniversGrid'
import Piliers from '@/components/sections/Piliers'
import AboutBrief from '@/components/sections/AboutBrief'
import Matiere from '@/components/sections/Matiere'
import Realisations from '@/components/sections/Realisations'
import Temoignages from '@/components/sections/Temoignages'
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
      <UniversGrid />
      <Piliers />
      <AboutBrief />
      <Matiere />
      <Realisations />
      <Temoignages />
      <ContactCTA />
    </>
  )
}
