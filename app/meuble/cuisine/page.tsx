import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import MeubleHero from '@/components/meuble/MeubleHero'
import { gammesCuisine } from '@/lib/data/meubles'

export const metadata: Metadata = {
  title: 'Meuble cuisine sur mesure — Gammes City & Charme | Solid Surface Tunisie',
  description:
    'Découvrez nos deux gammes de cuisine sur mesure : City (moyenne gamme) et Charme (haut de gamme). Caissons MDF, façades Blum, plans de travail Solid Surface sans joint. Fabriqué en Tunisie.',
  keywords: [
    'cuisine sur mesure Tunisie',
    'cuisine équipée Tunisie',
    'meuble cuisine Tunis',
    'plan de travail Solid Surface cuisine',
    'cuisine MDF Blum Tunisie',
  ],
}

export default function CuisinePage() {
  return (
    <>
      <MeubleHero
        overline="Meuble cuisine"
        titre={<>La cuisine,<br /><span className="text-or-champagne">entre matière et menuiserie.</span></>}
        image="/images/placeholder-cuisine-hero.jpg"
        imageAlt="Cuisine sur mesure fabriquée par Solid Surface Tunisie"
      />

      {/* Chapeau */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionTitle
              overline="Deux gammes, une logique"
              title="Choisissez votre&#10;niveau d'exigence."
            />
            <div className="space-y-6 font-inter font-light text-gris-texte text-sm leading-relaxed lg:pt-4">
              <p>
                Nos cuisines sont conçues en deux gammes — City et Charme — pour répondre à des budgets
                et des aspirations différents, sans jamais transiger sur la structure. Les deux reposent
                sur un caisson en MDF 18 mm et une quincaillerie Blum exclusivement.
              </p>
              <p>
                Ce qui change d'une gamme à l'autre, c'est la façade, la finition et la génération de quincaillerie.
                Ce qui ne change pas : la fabrication sur mesure, le plan de travail Solid Surface sans joint,
                et un seul interlocuteur du caisson à la pose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grille des gammes */}
      <section className="section-padding bg-gris-fume">
        <div className="container-site">
          <SectionTitle
            overline="Nos gammes"
            title="City ou Charme —&#10;laquelle vous ressemble ?"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-noir-profond/20 mt-4">
            {gammesCuisine.map((gamme) => (
              <div key={gamme.id} className="bg-noir-profond flex flex-col">
                {/* 📸 PHOTO À FOURNIR — photo de la gamme {gamme.nom} */}
                <div className="h-64 bg-gris-fume/60 flex items-center justify-center relative">
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-gris-texte/40 text-center px-4">
                    Photo à fournir<br />Gamme {gamme.nom}
                  </p>
                </div>
                <div className="p-8 lg:p-10 flex flex-col flex-1">
                  <p className="overline-text mb-3">{gamme.gamme}</p>
                  <h3 className="font-cormorant font-light text-blanc-pur text-3xl md:text-4xl mb-2">
                    {gamme.nom}
                  </h3>
                  <p className="font-cormorant italic text-or-champagne text-xl mb-6">
                    {gamme.accroche}
                  </p>
                  <GoldDivider variant="left" className="mb-6" />
                  <p className="font-inter font-light text-gris-texte text-sm leading-relaxed mb-8">
                    {gamme.description}
                  </p>
                  <Link
                    href={`#gamme-${gamme.id}`}
                    className="mt-auto inline-flex items-center gap-2 font-inter text-[0.65rem] tracking-[0.15em] uppercase text-or-champagne hover:text-blanc-pur transition-colors duration-300"
                  >
                    Voir les spécifications
                    <ArrowRight size={12} strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fiches techniques détaillées */}
      {gammesCuisine.map((gamme, gi) => (
        <section
          key={gamme.id}
          id={`gamme-${gamme.id}`}
          className={`section-padding ${gi % 2 === 0 ? 'bg-noir-profond' : 'bg-noir-pur'}`}
        >
          <div className="container-site">
            <div className="mb-16">
              <p className="overline-text mb-4">{gamme.gamme}</p>
              <h2
                className="font-cormorant font-light text-blanc-pur"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
              >
                Gamme <span className="text-or-champagne">{gamme.nom}</span> —{' '}
                spécifications techniques
              </h2>
              <GoldDivider className="mt-10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gris-fume/20">
              {/* Caisson */}
              <SpecCard titre="Caisson">
                <SpecLine label="Matière" value={`${gamme.caisson.matiere} ${gamme.caisson.epaisseur}`} />
                <SpecLine label="Finition" value={gamme.caisson.finition} />
                <SpecLine label="Assemblage" value={gamme.caisson.assemblage} />
              </SpecCard>

              {/* Façades */}
              <SpecCard titre="Façades">
                <SpecLine label="Support" value={`${gamme.facades.matiere}`} />
                <div className="pt-3">
                  <p className="font-inter text-[0.6rem] tracking-[0.1em] uppercase text-gris-texte/60 mb-3">
                    Options disponibles
                  </p>
                  {gamme.facades.options.map((opt) => (
                    <div key={opt} className="flex items-start gap-2 mb-2">
                      <Check size={10} strokeWidth={2} className="text-or-champagne mt-0.5 shrink-0" />
                      <span className="font-inter font-light text-xs text-gris-texte leading-relaxed">{opt}</span>
                    </div>
                  ))}
                </div>
              </SpecCard>

              {/* Quincaillerie */}
              <SpecCard titre="Quincaillerie">
                <SpecLine label="Charnières" value={gamme.quincaillerie.charnieres} />
                <SpecLine label="Tiroirs" value={gamme.quincaillerie.tiroirs} />
              </SpecCard>

              {/* Pieds & plinthe */}
              <SpecCard titre="Pieds & plinthe">
                <SpecLine label="Matière" value={gamme.pieds.matiere} />
                <SpecLine label="Hauteur" value={gamme.pieds.hauteur} />
                <SpecLine label="Plinthe" value={gamme.pieds.plinthe} />
              </SpecCard>

              {/* Plan de travail */}
              <SpecCard titre="Plan de travail">
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  {gamme.planDeTravail}
                </p>
              </SpecCard>

              {/* CTA inline */}
              <div className={`p-8 lg:p-10 flex flex-col justify-between ${gi % 2 === 0 ? 'bg-noir-profond' : 'bg-noir-pur'} border border-or-champagne/20`}>
                <div>
                  <p className="overline-text mb-4">Votre projet</p>
                  <p className="font-cormorant font-light text-blanc-pur text-2xl leading-snug mb-6">
                    Cette gamme correspond à votre projet ?
                  </p>
                </div>
                <Link href="/contact" className="btn-primary text-[0.65rem]">
                  Demander un devis
                  <ArrowRight size={12} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ContactCTA />
    </>
  )
}

function SpecCard({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="bg-gris-fume/10 p-8 lg:p-10">
      <p className="overline-text mb-6">{titre}</p>
      <GoldDivider variant="left" className="mb-6 opacity-50" />
      <div className="space-y-4">{children}</div>
    </div>
  )
}

function SpecLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-inter text-[0.6rem] tracking-[0.1em] uppercase text-gris-texte/60 mb-1">
        {label}
      </p>
      <p className="font-inter font-light text-xs text-gris-texte leading-relaxed">{value}</p>
    </div>
  )
}
