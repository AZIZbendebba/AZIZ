import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import MeubleHero from '@/components/meuble/MeubleHero'

export const metadata: Metadata = {
  title: 'Meuble salle de bain sur mesure Tunisie | Solid Surface Tunisie',
  description:
    'Meuble vasque suspendu ou posé, plan et vasque Solid Surface sans joint, caisson hydrofuge, colonnes, miroirs et niches LED. Salle de bain sur mesure fabriquée en Tunisie.',
  keywords: [
    'meuble salle de bain sur mesure Tunisie',
    'meuble vasque Solid Surface Tunis',
    'plan vasque sans joint Tunisie',
    'salle de bain sur mesure Tunis',
    'meuble hydrofuge sur mesure',
  ],
}

const elements = [
  {
    numero: '01',
    titre: 'Meuble vasque suspendu',
    description:
      "Structure fixée au mur, légèreté visuelle garantie. Le caisson en MDF hydrofuge est traité contre l'humidité. Hauteur ajustable selon usage et ergonomie.",
  },
  {
    numero: '02',
    titre: 'Meuble vasque posé',
    description:
      'Posé sur pieds réglables ou sur socle plein. Configuration idéale pour les salles de bain volumineuses ou les styles plus classiques. Grande capacité de rangement.',
  },
  {
    numero: '03',
    titre: 'Plan + vasque Solid Surface',
    description:
      'Surface et vasque thermoformées en un seul bloc — sans joint, sans raccord, sans jointure silicone. Antibactérien, réparable, non poreux. La finition ultime pour une salle de bain sans maintenance.',
  },
  {
    numero: '04',
    titre: 'Colonnes de rangement',
    description:
      'Colonne haute pleine hauteur ou mi-hauteur pour ranger linges, produits de soin, appareils électroménagers. Coordonnée en façade et matière avec le meuble vasque.',
  },
  {
    numero: '05',
    titre: 'Miroirs & niches LED',
    description:
      'Miroirs sur mesure avec ou sans éclairage intégré. Niches encastrées dans la cloison pour produits et accessoires — carrelées, en Solid Surface ou en MDF laqué hydrofuge.',
  },
]

export default function SalleDeBainPage() {
  return (
    <>
      <MeubleHero
        overline="Meuble salle de bain"
        titre={<>La salle de bain,<br /><span className="text-or-champagne">surface et structure en harmonie.</span></>}
        image="/images/placeholder-sdb-hero.jpg"
        imageAlt="Meuble salle de bain sur mesure — Solid Surface Tunisie"
      />

      {/* Intro */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionTitle
              overline="Meuble & matière"
              title="Le meuble et le plan&#10;fabriqués ensemble."
            />
            <div className="space-y-6 font-inter font-light text-gris-texte text-sm leading-relaxed lg:pt-4">
              <p>
                Dans une salle de bain, le meuble et la surface sont indissociables. Un plan de travail
                posé sur un meuble acheté ailleurs, c'est une interface — un joint de silicone qui vieillit,
                une cote qui ne tombe pas juste, une finition qui ne s'accorde pas.
              </p>
              <p>
                Nous fabriquons les deux : le meuble menuisé et le plan-vasque en Solid Surface.
                La vasque est thermoformée d'un seul tenant avec le plan. Zéro joint visible.
                Zéro raccord. Une seule pièce, une seule signature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Éléments */}
      <section className="section-padding bg-gris-fume">
        <div className="container-site">
          <SectionTitle
            overline="Ce que nous fabriquons"
            title="Chaque élément,&#10;sur mesure et coordonné."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-noir-profond/20 mt-4">
            {elements.map((el) => (
              <div key={el.numero} className="bg-noir-profond p-8 lg:p-10 flex flex-col">
                <div className="w-10 h-10 border border-or-champagne/40 flex items-center justify-center mb-6 shrink-0">
                  <span className="font-cormorant font-light text-or-champagne">{el.numero}</span>
                </div>
                <GoldDivider variant="left" className="mb-6 opacity-50" />
                <h3 className="font-cormorant font-light text-blanc-pur text-xl md:text-2xl mb-4">
                  {el.titre}
                </h3>
                <p className="font-inter font-light text-xs text-gris-texte leading-relaxed flex-1">
                  {el.description}
                </p>
              </div>
            ))}

            {/* Encart Solid Surface accent */}
            <div className="bg-noir-profond border border-or-champagne/30 p-8 lg:p-10 flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <p className="overline-text mb-6">Pourquoi le Solid Surface ?</p>
                <GoldDivider variant="left" className="mb-6 opacity-50" />
                <div className="space-y-4">
                  {[
                    { label: 'Sans joint', detail: "Vasque et plan thermoformés d'un seul bloc — aucune jointure silicone" },
                    { label: 'Antibactérien', detail: "Surface non poreuse : les bactéries n'adhèrent pas" },
                    { label: 'Réparable', detail: 'Une égratignure disparaît au ponçage — la matière est la même en surface et en profondeur' },
                  ].map((pt) => (
                    <div key={pt.label} className="border-t border-gris-fume/30 pt-4">
                      <p className="font-inter text-[0.6rem] tracking-[0.1em] uppercase text-or-champagne mb-1">{pt.label}</p>
                      <p className="font-inter font-light text-xs text-gris-texte leading-relaxed">{pt.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📸 PHOTO À FOURNIR — section visuelle salle de bain */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-[4/3] bg-gris-fume/40 flex items-center justify-center">
              <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-gris-texte/40 text-center px-4">
                Photo à fournir<br />Réalisation salle de bain
              </p>
            </div>
            <div>
              <p className="overline-text mb-6">Conception sur mesure</p>
              <GoldDivider variant="left" className="mb-8" />
              <h2 className="font-cormorant font-light text-blanc-pur text-3xl md:text-4xl mb-8 leading-tight">
                Chaque salle de bain est dessinée à partir de votre plan.
              </h2>
              <p className="font-inter font-light text-gris-texte text-sm leading-relaxed mb-10">
                Nous partons de vos cotes exactes — largeur disponible, hauteur sous plafond,
                position des évacuations — pour concevoir un meuble qui s'intègre parfaitement
                sans découpe approximative ni compromis sur les finitions.
              </p>
              <Link href="/contact" className="btn-primary text-[0.65rem]">
                Demander un devis
                <ArrowRight size={12} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
