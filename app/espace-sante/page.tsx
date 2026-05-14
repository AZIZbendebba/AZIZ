import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import { realisations } from '@/lib/data/realisations'

export const metadata: Metadata = {
  title: 'Espace Santé en Solid Surface — Solid Surface Tunisie',
  description:
    'Paillasses, vasques chirurgicales et mobilier médical en Solid Surface. Non poreux, sans joint, réparable — la référence pour les cabinets médicaux et cliniques en Tunisie.',
}

const points = [
  'Surface non poreuse — aucune bactérie ne peut s\'infiltrer',
  'Zéro joint : aucun point de rétention microbienne',
  'Résistance aux désinfectants et produits chimiques médicaux',
  'Vasques chirurgicales intégrées sans transition',
  'Réparable sans remplacement — continuité d\'activité garantie',
  'Conforme aux normes d\'hygiène des environnements de soins',
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
            Paillasses, vasques chirurgicales
            <br />
            <span className="text-or-champagne">et mobilier médical.</span>
          </h1>
        </div>
      </section>

      <GoldDivider />

      {/* Intro */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionTitle
                overline="Pour les professionnels de santé"
                title="La surface qui protège&#10;vos patients."
                description="Dans les environnements médicaux, le choix de la surface n'est pas esthétique — il est vital. Le Solid Surface répond aux exigences les plus strictes en matière d'hygiène et de durabilité."
              />

              <ul className="space-y-3 mt-8">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check size={14} strokeWidth={1.5} className="text-or-champagne mt-0.5 shrink-0" />
                    <span className="font-inter font-light text-sm text-gris-texte">{p}</span>
                  </li>
                ))}
              </ul>

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
              <div className="bg-gris-fume p-8 border border-gris-fume/50">
                <p className="font-inter font-light text-xs tracking-[0.12em] uppercase text-or-champagne mb-3">
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
            <SectionTitle
              overline="Réalisations"
              title="Nos espaces santé&#10;en images."
              align="center"
            />
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
