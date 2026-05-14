import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'
import { nuancier } from '@/lib/data/nuancier'

export const metadata: Metadata = {
  title: 'Nuancier Corian® — Solid Surface Tunisie',
  description:
    'Découvrez notre palette de teintes Corian® disponibles en Tunisie — unis classiques, veinés naturels, sombres premium et couleurs accent.',
}

export default function NuancierPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 bg-noir-profond">
        <div className="container-site">
          <p className="overline-text mb-6">Nuancier</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Choisissez votre
            <br />
            <span className="text-or-champagne">teinte Corian®.</span>
          </h1>
          <p className="font-inter font-light text-gris-texte max-w-2xl leading-relaxed mb-4">
            Nous travaillons avec l&apos;ensemble de la palette Corian® DuPont™.
            Ces teintes sont indicatives — les couleurs à l&apos;écran peuvent varier.
            Venez voir et toucher les échantillons dans notre showroom à La Soukra, Tunis.
          </p>
          <Link href="/contact" className="btn-ghost inline-flex mt-4">
            Demander un échantillon
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <GoldDivider />

      {/* Nuancier par catégorie */}
      <section className="pb-24 bg-noir-profond">
        <div className="container-site">
          {nuancier.map((categorie, ci) => (
            <div key={categorie.id} className={ci > 0 ? 'mt-20' : 'mt-16'}>
              <div className="mb-8">
                <p className="overline-text mb-2 text-or-champagne">{`0${ci + 1}`}</p>
                <h2 className="font-cormorant font-light text-blanc-pur text-3xl">{categorie.nom}</h2>
              </div>
              <GoldDivider className="mb-10 opacity-30" />

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {categorie.teintes.map((teinte) => (
                  <div key={teinte.id} className="group">
                    <div
                      className="w-full aspect-square mb-3 border border-gris-fume/30 group-hover:border-or-champagne/50 transition-colors duration-300"
                      style={{ backgroundColor: teinte.hex }}
                      aria-label={teinte.nom}
                    />
                    <p className="font-inter font-light text-xs text-blanc-pur/80 leading-snug">
                      {teinte.nom}
                    </p>
                    {teinte.description && (
                      <p className="font-inter font-light text-[0.65rem] text-gris-texte/60 mt-0.5 leading-snug">
                        {teinte.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gris-fume">
        <div className="container-site text-center max-w-2xl mx-auto">
          <SectionTitle
            overline="Showroom"
            title="Venez voir et toucher&#10;la matière."
            description="Les couleurs à l'écran ne remplacent pas l'expérience physique de la matière. Venez dans notre showroom à La Soukra pour voir les teintes en vraie lumière et toucher les finitions."
            align="center"
          />
          <Link href="/contact" className="btn-primary mt-8 inline-flex">
            Prendre rendez-vous au showroom
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </>
  )
}
