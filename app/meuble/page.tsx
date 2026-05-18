import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import MeubleHero from '@/components/meuble/MeubleHero'
import MeubleProcess from '@/components/meuble/MeubleProcess'

export const metadata: Metadata = {
  title: 'Meuble sur mesure Tunisie — Cuisine, Dressing, Salle de bain',
  description:
    'Solid Surface Tunisie conçoit et fabrique le meuble complet : caisson, façades, quincaillerie Blum et plan de travail Solid Surface. Cuisine, dressing, salle de bain — entièrement sur mesure.',
  keywords: [
    'meuble sur mesure Tunisie',
    'cuisine équipée Tunisie',
    'dressing sur mesure Tunis',
    'meuble salle de bain Tunisie',
    'fabricant meuble Tunis',
  ],
}

const sousPages = [
  {
    href: '/meuble/cuisine',
    titre: 'Meuble cuisine',
    description: 'Deux gammes — City et Charme — avec quincaillerie Blum et plan de travail Solid Surface.',
    image: '/images/placeholder-cuisine.jpg',
    overline: 'Cuisine',
  },
  {
    href: '/meuble/dressing',
    titre: 'Meuble dressing',
    description: 'Dressing fermé à façades ou dressing ouvert à structure apparente. Les deux se combinent.',
    image: '/images/placeholder-dressing.jpg',
    overline: 'Dressing',
  },
  {
    href: '/meuble/salle-de-bain',
    titre: 'Meuble salle de bain',
    description: 'Meuble vasque sur mesure, plan Solid Surface sans joint, colonnes de rangement, niches LED.',
    image: '/images/placeholder-sdb.jpg',
    overline: 'Salle de bain',
  },
]

export default function MeublePage() {
  return (
    <>
      <MeubleHero
        overline="Rubrique Meuble"
        titre={<>Le meuble complet,<br /><span className="text-or-champagne">sous une seule signature.</span></>}
        image="/images/placeholder-meuble-hero.jpg"
        imageAlt="Atelier de fabrication de meubles sur mesure — Solid Surface Tunisie"
      />

      {/* Intro */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionTitle
              overline="De la matière au meuble fini"
              title="Un seul interlocuteur,&#10;du caisson au plan de travail."
            />
            <div className="space-y-6 font-inter font-light text-gris-texte text-sm leading-relaxed lg:pt-4">
              <p>
                Depuis ses débuts, Solid Surface Tunisie transforme la matière : plans de travail sans joint,
                plans vasques thermoformés, habillages muraux en Solid Surface. Mais une surface seule ne fait
                pas une cuisine. Ni une salle de bain. Ni un dressing.
              </p>
              <p>
                C'est pourquoi notre atelier fabrique aussi le meuble complet — caisson, façades, quincaillerie,
                assemblage — en coordination directe avec la pose du Solid Surface. Un seul chantier,
                un seul geste, zéro interface entre deux corps de métier.
              </p>
              <p>
                Chaque meuble est conçu sur mesure, à partir de votre plan, pour votre espace.
                Aucune pièce de série. Aucun compromis sur les cotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 sous-pages cards */}
      <section className="section-padding bg-gris-fume">
        <div className="container-site">
          <SectionTitle
            overline="Nos univers"
            title="Trois espaces,&#10;un seul savoir-faire."
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-noir-profond/20 mt-4">
            {sousPages.map((page, i) => (
              <Link
                key={page.href}
                href={page.href}
                className="group relative block overflow-hidden bg-noir-profond h-80 md:h-96"
              >
                {/* 📸 PHOTO À FOURNIR — remplacer src par une vraie photo pour : {page.titre} */}
                <div className="absolute inset-0 bg-gris-fume/80 flex items-center justify-center">
                  <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-gris-texte/50 text-center px-4">
                    Photo à fournir<br />{page.titre}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/95 via-noir-profond/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <p className="overline-text mb-3">{page.overline}</p>
                  <h3 className="font-cormorant font-light text-blanc-pur text-2xl md:text-3xl mb-3 group-hover:text-or-champagne transition-colors duration-300">
                    {page.titre}
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte mb-5 max-w-xs leading-relaxed">
                    {page.description}
                  </p>
                  <div className="flex items-center gap-2 text-or-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-inter text-[0.6rem] tracking-[0.15em] uppercase">Découvrir</span>
                    <ArrowRight size={12} strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process 5 étapes */}
      <MeubleProcess />

      <ContactCTA />
    </>
  )
}
