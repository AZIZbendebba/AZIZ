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
  title: 'Cuisine sur mesure — Solid Surface Tunisie',
  description:
    'Surfaces Solid Surface et mobilier de cuisine sur mesure, conçus et fabriqués sous le même toit à Tunis. Plans de travail, îlots, caissons et façades intégrés.',
}

const surfaceItems = [
  'Plans de travail Solid Surface (Corian) sans joint',
  'Crédences et tablettes intégrées',
  'Vasques et éviers thermoformés',
  'Îlots centraux — plan et habillage',
  'Finitions multi-couleurs et veinées',
]

const mobilierItems = [
  'Caissons et façades sur mesure',
  'Tiroirs, coulissants, rangements verticaux',
  'Îlots centraux complets (structure + plan)',
  'Étagères et niches intégrées',
  'Mobilier complémentaire (vaisseliers, bibliothèques)',
]

const realisationsCuisine = realisations.filter((r) => r.universSlug === 'cuisine').slice(0, 3)

export default function CuisinePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[560px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/cuisine-ilot.jpg"
          alt="Cuisine en Solid Surface sur mesure"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/30 to-transparent" />
        <div className="relative z-10 container-site pb-20">
          <p className="overline-text mb-4">Univers Cuisine</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            De la conception à la pose —
            <br />
            <span className="text-or-champagne">surfaces et mobilier sous le même toit.</span>
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
                overline="Sur mesure, de A à Z"
                title="Votre cuisine complète,&#10;un seul devis."
                description="Nous ne fabriquons pas seulement le plan de travail. Nous concevons et fabriquons l'intégralité de votre cuisine — surfaces Solid Surface et mobilier intégré — sous le même toit, par les mêmes équipes."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne mb-4">
                    La surface
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
                Démarrer mon projet cuisine
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/cuisine-blanc-vene.jpg"
                  alt="Plan de travail en Solid Surface blanc veiné"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/cuisine-ilot.jpg"
                  alt="Îlot central cuisine Solid Surface"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Argument clé en mains */}
      <section className="py-16 bg-gris-fume">
        <div className="container-site max-w-3xl mx-auto text-center">
          <p className="overline-text mb-6">Une cuisine complète, un seul devis</p>
          <p className="font-inter font-light text-gris-texte text-sm leading-relaxed">
            Vous ne commandez pas séparément le plan de travail, les meubles et la pose.
            Notre atelier conçoit l&apos;ensemble en cohérence — proportions, alignements, finitions.
            Vous recevez votre cuisine clé en main, posée par les mêmes mains qui l&apos;ont fabriquée.
          </p>
        </div>
      </section>

      {/* Réalisations */}
      {realisationsCuisine.length > 0 && (
        <section className="section-padding bg-noir-profond">
          <div className="container-site">
            <SectionTitle
              overline="Réalisations"
              title="Nos cuisines&#10;en images."
              align="center"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              {realisationsCuisine.map((r) => (
                <Link key={r.slug} href={`/realisations/${r.slug}`} className="group relative block overflow-hidden bg-gris-fume h-64">
                  <Image
                    src={r.imageHero}
                    alt={r.titre}
                    fill
                    className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-cormorant font-light text-blanc-pur text-lg group-hover:text-or-champagne transition-colors">
                      {r.titre}
                    </h3>
                    <p className="font-inter font-light text-xs text-gris-texte mt-1">{r.lieu}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/realisations?univers=cuisine" className="btn-ghost inline-flex">
                Voir toutes les réalisations cuisine
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </section>
      )}

      <Temoignages />
      <ContactCTA />
    </>
  )
}
