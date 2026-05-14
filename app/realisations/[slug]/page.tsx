import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, MapPin, Calendar } from 'lucide-react'
import { realisations, getRealisationBySlug } from '@/lib/data/realisations'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return realisations.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = getRealisationBySlug(params.slug)
  if (!r) return {}
  return {
    title: r.titre,
    description: r.description,
  }
}

export default function RealisationPage({ params }: Props) {
  const r = getRealisationBySlug(params.slug)
  if (!r) notFound()

  const currentIndex = realisations.findIndex((x) => x.slug === r.slug)
  const prev = realisations[currentIndex - 1]
  const next = realisations[currentIndex + 1]

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[550px] overflow-hidden bg-noir-profond flex items-end">
        <Image src={r.imageHero} alt={r.titre} fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/20 to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-gris-texte hover:text-or-champagne transition-colors mb-8 font-inter text-[0.65rem] tracking-[0.12em] uppercase"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Retour aux réalisations
          </Link>
          <p className="overline-text mb-4">{r.univers} — {r.secteur}</p>
          <h1
            className="font-cormorant font-light text-blanc-pur"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4.5rem)', lineHeight: 1.1 }}
          >
            {r.titre}
          </h1>
        </div>
      </section>

      {/* Meta */}
      <section className="border-b border-gris-fume bg-gris-fume">
        <div className="container-site py-8">
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-2">
              <MapPin size={14} strokeWidth={1.5} className="text-or-champagne" />
              <span className="font-inter font-light text-sm text-gris-texte">{r.lieu}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} strokeWidth={1.5} className="text-or-champagne" />
              <span className="font-inter font-light text-sm text-gris-texte">{r.annee}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <p className="overline-text mb-4">Le projet</p>
                <p className="font-inter font-light text-gris-texte leading-relaxed">{r.description}</p>
              </div>
            </div>

            <div>
              {r.prestations.length > 0 && (
                <>
                  <p className="overline-text mb-6">Prestations réalisées</p>
                  <ul className="space-y-3 mb-10">
                    {r.prestations.map((p) => (
                      <li key={p} className="flex items-start gap-3 pb-3 border-b border-gris-fume/40">
                        <span className="text-or-champagne mt-1 shrink-0 text-xs">—</span>
                        <span className="font-inter font-light text-sm text-gris-texte leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="overline-text mb-6">Matériaux</p>
              <ul className="space-y-3">
                {r.materiaux.map((m) => (
                  <li key={m} className="flex items-center gap-3 pb-3 border-b border-gris-fume/40">
                    <div className="w-1 h-1 bg-or-champagne shrink-0" />
                    <span className="font-inter font-light text-sm text-gris-texte">{m}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-12">
                <p className="overline-text mb-6">Votre projet</p>
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed mb-6">
                  Ce projet vous inspire ? Parlons de votre espace.
                </p>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Demander un devis
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {r.images.length > 1 && (
        <section className="pb-16 bg-noir-profond">
          <div className="container-site">
            <GoldDivider className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {r.images.slice(1).map((img, i) => (
                <div key={i} className={`relative overflow-hidden ${i === 0 && r.images.length > 2 ? 'md:col-span-2' : ''}`}>
                  <Image
                    src={img}
                    alt={`${r.titre} — vue ${i + 2}`}
                    width={1200}
                    height={800}
                    className="w-full h-72 md:h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nav prev/next */}
      <section className="py-12 border-t border-gris-fume bg-gris-fume">
        <div className="container-site flex items-center justify-between">
          {prev ? (
            <Link href={`/realisations/${prev.slug}`} className="group flex items-center gap-3">
              <ArrowLeft size={16} strokeWidth={1.5} className="text-gris-texte group-hover:text-or-champagne transition-colors" />
              <div>
                <p className="overline-text mb-1">Précédent</p>
                <p className="font-cormorant font-light text-blanc-pur text-lg group-hover:text-or-champagne transition-colors">{prev.titre}</p>
              </div>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/realisations/${next.slug}`} className="group flex items-center gap-3 text-right">
              <div>
                <p className="overline-text mb-1">Suivant</p>
                <p className="font-cormorant font-light text-blanc-pur text-lg group-hover:text-or-champagne transition-colors">{next.titre}</p>
              </div>
              <ArrowRight size={16} strokeWidth={1.5} className="text-gris-texte group-hover:text-or-champagne transition-colors" />
            </Link>
          ) : <div />}
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
