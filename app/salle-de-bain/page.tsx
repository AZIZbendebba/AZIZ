import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import Temoignages from '@/components/sections/Temoignages'
import { realisations } from '@/lib/data/realisations'

export const metadata: Metadata = {
  title: 'Salle de Bain sur mesure — Solid Surface Tunisie',
  description:
    'Vasques Solid Surface, meubles vasque sur mesure et habillages intégrés. Votre salle de bain conçue dans son intégralité, fabriquée à Tunis.',
}

const surfaceItems = [
  'Vasques thermoformées sans joint',
  'Plans de toilette continus',
  'Habillages muraux Solid Surface',
  'Tablettes et niches intégrées',
  'Receveurs et bacs de douche',
]

const mobilierItems = [
  'Meubles vasque sur mesure (suspendus ou au sol)',
  'Colonnes de rangement',
  'Miroirs et caissons miroir',
  'Mobilier d\'appoint (banc, étagères)',
]

const realisationsSDB = realisations.filter((r) => r.universSlug === 'salle-de-bain').slice(0, 3)

export default function SalleDeBainPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/plan-travail-beige.jpg"
          alt="Salle de bain en Solid Surface sur mesure"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/30 to-transparent" />
        <div className="relative z-10 container-site pb-20">
          <p className="overline-text mb-4">Univers Salle de Bain</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Vasques, meubles vasque
            <br />
            <span className="text-or-champagne">et habillages intégrés.</span>
          </h1>
        </div>
      </section>

      <GoldDivider />

      {/* Intro + 2 blocs */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionTitle
                overline="Conception intégrée"
                title="Votre salle de bain&#10;dans son intégralité."
                description="Vasques sans joint, plans de toilette continus, mobilier sur mesure — nous concevons et fabriquons l'ensemble de votre salle de bain sous le même toit, pour une cohérence parfaite entre la surface et le meuble."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne mb-4">
                    Les surfaces
                  </p>
                  <ul className="space-y-2.5">
                    {surfaceItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-or-champagne mt-1 shrink-0">—</span>
                        <span className="font-inter font-light text-sm text-gris-texte leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne mb-4">
                    Le mobilier
                  </p>
                  <ul className="space-y-2.5">
                    {mobilierItems.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-or-champagne mt-1 shrink-0">—</span>
                        <span className="font-inter font-light text-sm text-gris-texte leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link href="/contact" className="btn-primary mt-10 inline-flex">
                Démarrer mon projet salle de bain
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/plan-travail-beige.jpg"
                alt="Plan de toilette en Solid Surface avec vasque intégrée"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations */}
      {realisationsSDB.length > 0 && (
        <section className="section-padding bg-gris-fume">
          <div className="container-site">
            <SectionTitle
              overline="Réalisations"
              title="Nos salles de bain&#10;en images."
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {realisationsSDB.map((r) => (
                <Link key={r.slug} href={`/realisations/${r.slug}`} className="group relative block overflow-hidden bg-gris-fume h-64">
                  <Image src={r.imageHero} alt={r.titre} fill
                    className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-cormorant font-light text-blanc-pur text-lg group-hover:text-or-champagne transition-colors">{r.titre}</h3>
                    <p className="font-inter font-light text-xs text-gris-texte mt-1">{r.lieu}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Temoignages />
      <ContactCTA />
    </>
  )
}
