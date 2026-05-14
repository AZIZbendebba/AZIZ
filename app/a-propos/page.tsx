import type { Metadata } from 'next'
import Image from 'next/image'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'À propos — Solid Surface Tunisie',
  description:
    'Depuis 2006, Solid Surface Tunisie fabrique des surfaces sur mesure à Tunis. Plus de 15 ans d\'expertise au service des cuisines, salles de bain et espaces professionnels.',
}

const valeurs = [
  {
    titre: 'L\'exigence du geste',
    texte: 'Chaque coupe, chaque raccord, chaque finition est l\'acte d\'un artisan qui sait que la matière révèle tout.',
  },
  {
    titre: 'L\'intégral sur mesure',
    texte: 'Aucun projet ne ressemble à un autre. Nous ne produisons pas en série — nous concevons à la demande, pour chaque lieu, pour chaque usage.',
  },
  {
    titre: 'La durée dans le temps',
    texte: 'Nos surfaces sont pensées pour durer des décennies. La qualité, c\'est aussi ce qui ne demande pas d\'être refait.',
  },
]

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/cuisine-blanc-vene.jpg"
          alt="Atelier Solid Surface Tunisie"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/40 to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <p className="overline-text mb-4">À propos</p>
          <h1
            className="font-cormorant font-light text-blanc-pur"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Depuis 2006,
            <br />
            <span className="text-or-champagne">nous façonnons la matière.</span>
          </h1>
        </div>
      </section>

      {/* Histoire */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <SectionTitle
                overline="Notre histoire"
                title="Nés de la matière,&#10;portés par l'ambition."
              />
              <div className="space-y-6 font-inter font-light text-gris-texte text-sm leading-relaxed">
                <p>
                  Solid Surface Tunisie est née en 2006 d&apos;une conviction simple : la
                  Tunisie mérite des surfaces qui rivalisent avec ce qui se fait de mieux en Europe.
                </p>
                <p>
                  En près de vingt ans, notre atelier à Tunis s&apos;est imposé comme la référence locale
                  du Solid Surface sur mesure. Les machines évoluent. La commande
                  numérique remplace le tracé à la règle. Les chantiers s&apos;élargissent —
                  des cuisines familiales aux espaces médicaux, des salles de bain aux sièges sociaux.
                </p>
                <p>
                  Aujourd&apos;hui, notre engagement reste identique : concevoir, fabriquer et installer
                  chaque surface sur mesure, sans joint visible, sans compromis sur la qualité.
                  La précision du geste, la qualité de la matière, la parole tenue.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/cuisine-ilot.jpg"
                  alt="Réalisation Solid Surface Tunisie"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-noir-profond p-8 border border-gris-fume max-w-xs hidden lg:block">
                <p className="font-cormorant font-light italic text-blanc-pur/70 text-xl leading-snug">
                  « La matière ne ment pas. Elle révèle tout — la précision du geste,
                  la rigueur de la conception. »
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding bg-gris-fume">
        <div className="container-site">
          <SectionTitle
            overline="Nos valeurs"
            title="Ce qui guide&#10;chaque décision."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gris-fume/50 mt-8">
            {valeurs.map((v, i) => (
              <div key={v.titre} className="bg-noir-profond p-10 lg:p-12">
                <div className="w-8 h-8 border border-or-champagne flex items-center justify-center mb-8">
                  <span className="font-cormorant text-or-champagne text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <GoldDivider variant="left" className="mb-6" />
                <h3 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">{v.titre}</h3>
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
