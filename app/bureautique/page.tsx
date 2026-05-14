import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import { realisations } from '@/lib/data/realisations'

export const metadata: Metadata = {
  title: 'Bureautique en Solid Surface sur mesure — Solid Surface Tunisie',
  description:
    'Comptoirs d\'accueil, plans de travail et mobilier de bureau sur mesure en Solid Surface. Fabriqués à Tunis pour les entreprises tunisiennes.',
}

const points = [
  'Comptoir d\'accueil monolithique, identité de marque incarnée',
  'Bureau de direction sur mesure, sans joint, sans limite dimensionnelle',
  'Plan de travail collectif et open space',
  'Cloisons et séparateurs acoustiques en Solid Surface',
  'Résistance à l\'usage intensif et aux produits de nettoyage professionnels',
  'Gamme complète de teintes et finitions pour s\'accorder à votre charte graphique',
]

const realisationsBureautique = realisations.filter((r) => r.universSlug === 'bureautique').slice(0, 3)

export default function BureautiquePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/cuisine-grise.jpg"
          alt="Bureautique en Solid Surface sur mesure"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/30 to-transparent" />
        <div className="relative z-10 container-site pb-20">
          <p className="overline-text mb-4">Univers Bureautique</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Comptoirs d&apos;accueil, plans de travail
            <br />
            <span className="text-or-champagne">et mobilier sur mesure.</span>
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
                overline="Pour les professionnels"
                title="Des espaces de travail&#10;à l'image de votre entreprise."
                description="Votre espace professionnel est le premier message que vous envoyez à vos clients et collaborateurs. Le Solid Surface vous permet de concevoir un environnement de travail qui incarne votre identité."
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
                Démarrer mon projet bureautique
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/cuisine-grise.jpg"
                  alt="Bureau de direction en Solid Surface gris"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="/images/cuisine-hachicha.jpg"
                  alt="Comptoir d'accueil en Solid Surface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {realisationsBureautique.length > 0 && (
        <section className="section-padding bg-gris-fume">
          <div className="container-site">
            <SectionTitle
              overline="Réalisations"
              title="Nos espaces professionnels&#10;en images."
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {realisationsBureautique.map((r) => (
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
