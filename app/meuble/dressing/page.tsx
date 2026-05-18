import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'
import ContactCTA from '@/components/sections/ContactCTA'
import MeubleHero from '@/components/meuble/MeubleHero'

export const metadata: Metadata = {
  title: 'Meuble dressing sur mesure Tunisie | Solid Surface Tunisie',
  description:
    'Dressing fermé à façades ou dressing ouvert à structure apparente — conçu sur mesure pour votre espace. LED intégrées, vitrages personnalisables, combinaison libre des configurations.',
  keywords: [
    'dressing sur mesure Tunisie',
    'dressing sur mesure Tunis',
    'placard sur mesure Tunisie',
    'meuble rangement sur mesure',
    'dressing ouvert fermé Tunisie',
  ],
}

export default function DressingPage() {
  return (
    <>
      <MeubleHero
        overline="Meuble dressing"
        titre={<>Le rangement<br /><span className="text-or-champagne">comme architecture.</span></>}
        image="/images/placeholder-dressing-hero.jpg"
        imageAlt="Dressing sur mesure — Solid Surface Tunisie"
      />

      {/* Intro */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <SectionTitle
              overline="L'art du rangement"
              title="Un espace pensé,&#10;chaque centimètre optimisé."
            />
            <div className="space-y-6 font-inter font-light text-gris-texte text-sm leading-relaxed lg:pt-4">
              <p>
                Un dressing n'est pas un meuble. C'est un espace dans l'espace — une architecture
                intérieure qui organise, dissimule ou met en scène selon votre rapport aux objets.
              </p>
              <p>
                Nous concevons deux configurations : le dressing fermé, où façades et poignées
                composent une façade sobre et unitaire ; le dressing ouvert, où la structure
                apparente, l'îlot central et les matières s'exposent comme un élément décoratif
                à part entière.
              </p>
              <p className="text-blanc-pur/80 border-l-2 border-or-champagne pl-5 italic font-cormorant text-base leading-relaxed">
                Les deux configurations se combinent librement sur mesure,
                dans un même projet, selon les zones et les usages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Dressing fermé */}
      <section className="section-padding bg-gris-fume" id="dressing-ferme">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* 📸 PHOTO À FOURNIR — dressing fermé avec façades */}
            <div className="relative aspect-[4/5] bg-noir-profond/60 flex items-center justify-center order-2 lg:order-1">
              <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-gris-texte/40 text-center px-4">
                Photo à fournir<br />Dressing fermé
              </p>
            </div>
            <div className="order-1 lg:order-2">
              <p className="overline-text mb-6">Configuration 01</p>
              <GoldDivider variant="left" className="mb-8" />
              <h2 className="font-cormorant font-light text-blanc-pur text-4xl md:text-5xl mb-8 leading-tight">
                Dressing fermé
              </h2>
              <div className="space-y-5 font-inter font-light text-gris-texte text-sm leading-relaxed">
                <p>
                  Des façades du sol au plafond — laquées, plaquées ou en finition Maxxi —
                  pour un volume unifié qui efface le rangement au profit du décor.
                </p>
                <p>
                  Les poignées intégrées ou profilées maintiennent la continuité de la façade.
                  Les charnières Blum assurent ouvertures douces et silencieuses.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    'Façades sur mesure du sol au plafond',
                    'Charnières Blum soft-close',
                    'Poignées intégrées ou profilées',
                    'Intérieur aménageable : tiges, tiroirs, clayettes',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-or-champagne mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bloc Dressing ouvert */}
      <section className="section-padding bg-noir-profond" id="dressing-ouvert">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="overline-text mb-6">Configuration 02</p>
              <GoldDivider variant="left" className="mb-8" />
              <h2 className="font-cormorant font-light text-blanc-pur text-4xl md:text-5xl mb-8 leading-tight">
                Dressing ouvert
              </h2>
              <div className="space-y-5 font-inter font-light text-gris-texte text-sm leading-relaxed">
                <p>
                  Structure apparente, îlot central, alliances bois-métal — le dressing ouvert
                  assume sa présence dans l'espace. Le rangement devient décor.
                </p>
                <p>
                  Les niches, tiges et plateaux sont positionnés selon vos usages. L'ensemble
                  peut intégrer un îlot central avec tiroirs, surface de pliage ou banc.
                </p>
                <ul className="space-y-3 pt-2">
                  {[
                    'Structure apparente métal ou bois laqué',
                    'Îlot central en option',
                    'Niches et plateaux positionnables',
                    'Tiges chromées ou noires',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-1 h-1 rounded-full bg-or-champagne mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* 📸 PHOTO À FOURNIR — dressing ouvert avec structure apparente */}
            <div className="relative aspect-[4/5] bg-gris-fume/40 flex items-center justify-center">
              <p className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-gris-texte/40 text-center px-4">
                Photo à fournir<br />Dressing ouvert
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Encart transversal LED + vitrages */}
      <section className="section-padding bg-noir-pur">
        <div className="container-site">
          <div className="border border-or-champagne/30 p-10 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="overline-text mb-6">Options transversales</p>
                <h2 className="font-cormorant font-light text-blanc-pur text-3xl md:text-4xl mb-6 leading-tight">
                  Lumière & transparence,<br />
                  <span className="text-or-champagne">selon votre projet.</span>
                </h2>
                <p className="font-inter font-light text-gris-texte text-sm leading-relaxed">
                  Ces options s'appliquent aux deux configurations — fermée ou ouverte —
                  et se définissent avec vous lors de la conception 3D.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gris-fume/20">
                <div className="bg-gris-fume/10 p-8">
                  <div className="w-8 h-8 border border-or-champagne flex items-center justify-center mb-6">
                    <span className="font-cormorant text-or-champagne text-sm">01</span>
                  </div>
                  <GoldDivider variant="left" className="mb-4 opacity-50" />
                  <h3 className="font-cormorant font-light text-blanc-pur text-xl mb-4">
                    LED intégrées
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte leading-relaxed">
                    Éclairage intégré dans les niches, sous les plateaux ou en bandeau de plinthe.
                    Gradable, en lumière chaude ou froide selon l'ambiance souhaitée.
                  </p>
                </div>
                <div className="bg-gris-fume/10 p-8">
                  <div className="w-8 h-8 border border-or-champagne flex items-center justify-center mb-6">
                    <span className="font-cormorant text-or-champagne text-sm">02</span>
                  </div>
                  <GoldDivider variant="left" className="mb-4 opacity-50" />
                  <h3 className="font-cormorant font-light text-blanc-pur text-xl mb-4">
                    Vitrages personnalisables
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte leading-relaxed">
                    Portes vitrées transparentes, dépoli ou smoked pour exposer ou tamiser
                    le contenu. Le vitrage s'intègre dans la structure existante sans rupture.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
