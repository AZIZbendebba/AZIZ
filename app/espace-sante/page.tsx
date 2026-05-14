import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import { realisations } from '@/lib/data/realisations'

export const metadata: Metadata = {
  title: 'Espace Santé sur mesure — Solid Surface Tunisie',
  description:
    'Aménagement complet de cabinets médicaux, dentaires et laboratoires — paillasses Solid Surface et mobilier médical sur mesure, conformes aux normes d\'hygiène.',
}

const surfaceItems = [
  'Paillasses Solid Surface antibactériennes',
  'Vasques chirurgicales thermoformées',
  'Plans de soin sans joint',
  'Habillages muraux hygiéniques',
  'Comptoirs d\'accueil patients',
]

const mobilierItems = [
  'Caissons et rangements médicaux',
  'Mobilier de cabinet dentaire (zone soin, accueil)',
  'Bureaux médecin sur mesure',
  'Aménagement complet de laboratoires',
  'Mobilier d\'attente et de réception',
]

const realisationsSante = realisations.filter((r) => r.universSlug === 'espace-sante').slice(0, 3)

export default function EspaceSantePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/cuisine-blanc-vene.jpg"
          alt="Espace santé en Solid Surface"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/30 to-transparent" />
        <div className="relative z-10 container-site pb-20">
          <p className="overline-text mb-4">Univers Espace Santé</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Aménagement complet de cabinets
            <br />
            <span className="text-or-champagne">médicaux et laboratoires.</span>
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
                overline="Notre offre santé"
                title="Paillasses, mobilier médical&#10;et aménagement complet."
                description="Nous comprenons les contraintes du milieu médical : facilité de nettoyage, résistance aux désinfectants, absence de zones de rétention bactérienne. Tout notre mobilier est conçu pour ces exigences."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne mb-4">
                    Les surfaces techniques
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
                    Le mobilier médical
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
                Demander un devis médical
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/cuisine-blanc-vene.jpg"
                  alt="Paillasse médicale en Solid Surface blanc"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="bg-noir-profond p-8 border border-gris-fume">
                <p className="font-inter font-light text-[0.6rem] tracking-[0.12em] uppercase text-or-champagne mb-3">
                  Clientèle
                </p>
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  Cabinets médicaux, cliniques privées, laboratoires d&apos;analyses,
                  centres de soins dentaires, pharmacies et hôpitaux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {realisationsSante.length > 0 && (
        <section className="section-padding bg-gris-fume">
          <div className="container-site">
            <SectionTitle overline="Réalisations" title="Nos espaces santé&#10;en images." align="center" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {realisationsSante.map((r) => (
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

      <ContactCTA />
    </>
  )
}
