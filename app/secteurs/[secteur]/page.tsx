import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { secteurs, getSecteurBySlug } from '@/lib/data/secteurs'
import { getRealisationsBySecteur } from '@/lib/data/realisations'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'
import ContactCTA from '@/components/sections/ContactCTA'

type Props = { params: { secteur: string } }

export async function generateStaticParams() {
  return secteurs.map((s) => ({ secteur: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const secteur = getSecteurBySlug(params.secteur)
  if (!secteur) return {}
  return {
    title: secteur.nom,
    description: secteur.accroche,
  }
}

export default function SecteurPage({ params }: Props) {
  const secteur = getSecteurBySlug(params.secteur)
  if (!secteur) notFound()

  const realisations = getRealisationsBySecteur(params.secteur)
  const autreSecteurs = secteurs.filter((s) => s.slug !== params.secteur).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-noir-profond flex items-end">
        <Image src={secteur.image} alt={secteur.nom} fill priority className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/30 to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <p className="overline-text mb-4">Secteur</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            {secteur.nom}
          </h1>
          <p className="font-cormorant font-light italic text-or-champagne text-xl md:text-2xl">
            {secteur.accroche}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionTitle
              overline={secteur.description}
              title={`Notre approche\n${secteur.nom.toLowerCase()}.`}
              description={`Pour le secteur ${secteur.nom.toLowerCase()}, nous intervenons sur l'ensemble de la chaîne — conception, fabrication, pose — avec des matériaux adaptés aux contraintes spécifiques du secteur.`}
            />
            <div>
              <p className="overline-text mb-6">Nos interventions</p>
              <ul className="space-y-4">
                {secteur.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-4 pb-4 border-b border-gris-fume/30">
                    <div className="w-1.5 h-1.5 bg-or-champagne shrink-0 mt-2" />
                    <span className="font-inter font-light text-sm text-gris-texte">{detail}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary mt-8 inline-flex">
                Discuter de votre projet
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations du secteur */}
      {realisations.length > 0 && (
        <section className="section-padding bg-gris-fume">
          <div className="container-site">
            <SectionTitle
              overline="Réalisations"
              title={`Nos projets\n${secteur.nom.toLowerCase()}.`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {realisations.map((r) => (
                <Link key={r.slug} href={`/realisations/${r.slug}`} className="group relative block overflow-hidden h-72 bg-noir-profond">
                  <Image src={r.imageHero} alt={r.titre} fill className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="overline-text mb-2 text-or-champagne/60">{r.lieu} — {r.annee}</p>
                    <h3 className="font-cormorant font-light text-blanc-pur text-xl group-hover:text-or-champagne transition-colors">{r.titre}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Autres secteurs */}
      <section className="section-padding bg-blanc-creme">
        <div className="container-site">
          <SectionTitle overline="Explorer" title="Autres secteurs." theme="light" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-noir-profond/10">
            {autreSecteurs.map((s) => (
              <Link key={s.slug} href={`/secteurs/${s.slug}`} className="group relative block overflow-hidden h-48 bg-noir-profond">
                <Image src={s.image} alt={s.nom} fill className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500" sizes="25vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-cormorant font-light text-blanc-pur text-lg group-hover:text-or-champagne transition-colors">{s.nom}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
