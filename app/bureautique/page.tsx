import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import { realisations } from '@/lib/data/realisations'

export const metadata: Metadata = {
  title: 'Bureautique & Agencement — Solid Surface Tunisie',
  description:
    'Comptoirs d\'accueil, banques d\'accueil et mobilier d\'agencement Solid Surface sur mesure pour sièges sociaux, hôtels, banques et espaces commerciaux.',
}

const surfaceItems = [
  'Comptoirs d\'accueil Solid Surface',
  'Banques d\'accueil sans joint',
  'Tablettes et plateaux de réception',
  'Habillages muraux signalétiques',
  'Plans de bar et comptoirs commerciaux',
]

const mobilierItems = [
  'Mobilier de bureau sur mesure',
  'Bibliothèques et rangements',
  'Tables de réunion intégrées',
  'Vestiaires et casiers',
  'Aménagement complet d\'espaces de travail',
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
            Comptoirs d&apos;accueil et mobilier d&apos;agencement —
            <br />
            <span className="text-or-champagne">Solid Surface sur mesure.</span>
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
                overline="Notre offre tertiaire"
                title="Des espaces professionnels&#10;à l'image de votre marque."
                description="Votre espace professionnel est le premier message que vous envoyez à vos clients et collaborateurs. Nous concevons l'ensemble de l'aménagement — surfaces et mobilier — en cohérence avec votre identité."
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
                    Le mobilier d&apos;agencement
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

              <div className="mt-10 p-6 border border-gris-fume">
                <p className="font-inter font-light text-[0.6rem] tracking-[0.12em] uppercase text-or-champagne mb-3">
                  Cibles
                </p>
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  Sièges sociaux, banques, hôtels (réceptions, lobbies), cliniques (zones d&apos;accueil),
                  restaurants et espaces commerciaux. Pour chaque projet, nous concevons l&apos;ensemble
                  de l&apos;aménagement, en cohérence avec votre identité de marque.
                </p>
              </div>

              <Link href="/contact" className="btn-primary mt-8 inline-flex">
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
            <SectionTitle overline="Réalisations" title="Nos espaces professionnels&#10;en images." align="center" />
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
