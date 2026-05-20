import type { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig } from '@/lib/data/seo'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Notre Groupe',
  description:
    'Solid Surface Tunisie , une entreprise familiale de 15 ans, repositionnée par la nouvelle génération comme une marque moderne et premium.',
}

const valeurs = [
  {
    titre: 'L\'exigence du geste',
    texte: 'Chaque coupe, chaque raccord, chaque finition est l\'acte d\'un artisan qui sait que la matière révèle tout.',
  },
  {
    titre: 'L\'intégral sur mesure',
    texte: 'Aucun projet ne ressemble à un autre. Nous ne produisons pas en série , nous concevons à la demande, pour chaque lieu, pour chaque usage.',
  },
  {
    titre: 'La durée dans le temps',
    texte: 'Nos surfaces et nos meubles sont pensés pour durer des décennies. La qualité, c\'est aussi ce qui ne demande pas d\'être refait.',
  },
]

export default function LeGroupePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1920&q=80"
          alt="Atelier Solid Surface Tunisie"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/40 to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <p className="overline-text mb-4">Notre groupe</p>
          <h1
            className="font-serif font-light text-blanc-pur"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Vingt ans de matière.
            <br />
            <span className="text-or-champagne">Une nouvelle génération.</span>
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
              <div className="space-y-6 font-sans font-light text-blanc-pur/60 text-sm leading-relaxed">
                <p>
                  Fondée en 2004 par la famille Hachicha, Solid Surface Tunisie naît
                  d&apos;une conviction simple : la Tunisie mérite des surfaces et des meubles
                  qui rivalisent avec ce qui se fait de mieux en Europe.
                </p>
                <p>
                  En deux décennies, l&apos;atelier grandit. Les machines évoluent. La commande
                  numérique remplace le tracé à la règle. Les chantiers s&apos;élargissent ,
                  des villas de La Marsa aux hôtels de Djerba, des cliniques de Sfax aux
                  sièges sociaux de Tunis.
                </p>
                <p>
                  Aujourd&apos;hui, la deuxième génération reprend le flambeau avec une ambition
                  claire : faire de Solid Surface Tunisie une référence régionale du
                  sur-mesure premium , sans renoncer à ce qui a fait sa réputation :
                  la précision du geste, la qualité de la matière, la parole tenue.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/cuisine-hachicha.jpg"
                  alt="Réalisation signature , Maison Hachicha, La Marsa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-noir-profond p-8 border border-gris-fume max-w-xs hidden lg:block">
                <p className="font-serif font-light italic text-blanc-pur/70 text-xl leading-snug">
                  « La matière ne ment pas. Elle révèle tout , la précision du geste,
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
                  <span className="font-serif text-or-champagne text-lg">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <GoldDivider variant="left" className="mb-6" />
                <h3 className="font-serif font-light text-blanc-pur text-2xl mb-4">{v.titre}</h3>
                <p className="font-sans font-light text-sm text-blanc-pur/60 leading-relaxed">{v.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Les deux entités */}
      <section className="section-padding bg-blanc-creme">
        <div className="container-site">
          <SectionTitle
            overline="Nos deux entités"
            title="Un groupe,&#10;deux expertises."
            theme="light"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {[
              {
                nom: 'Solid Surface Tunisie',
                role: 'Transformation & fabrication',
                desc: 'Transformateur agréé Corian® DuPont™. Découpe numérique, thermoformage, ponçage, finition. Notre atelier de 800 m² à Tunis produit de la surface à la demande, pour chaque projet.',
                img: '/images/plan-travail-beige.jpg',
              },
              {
                nom: 'Solid Surface Tunisie',
                role: 'Mobilier sur mesure',
                desc: 'Atelier de menuiserie d\'agencement. Cuisines, salle de bain, dressings, bibliothèques, mobilier de bureau , chaque meuble est conçu pour s\'articuler parfaitement avec les surfaces.',
                img: '/images/cuisine-grise.jpg',
              },
            ].map((entite) => (
              <div key={entite.nom} className="border border-noir-profond/10 overflow-hidden">
                <div className="relative h-64">
                  <Image src={entite.img} alt={entite.nom} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-8 bg-blanc-creme">
                  <p className="overline-text mb-3 text-or-champagne">{entite.role}</p>
                  <h3 className="font-serif font-light text-noir-profond text-2xl mb-4">{entite.nom}</h3>
                  <p className="font-sans font-light text-sm text-gris-fume/70 leading-relaxed">{entite.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
