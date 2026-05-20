'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'

const etapes = [
  {
    numero: '01',
    titre: 'Conception',
    description:
      'Rencontre avec votre architecte ou directement avec vous. Relevé des côtes, analyse des usages, sélection des matières. Nous dessinons chaque pièce avant de la fabriquer.',
  },
  {
    numero: '02',
    titre: 'Prototypage',
    description:
      'Sélection des échantillons Corian®, simulation des finitions et des teintes. Vous validez la matière avant la découpe. Zéro surprise à la pose.',
  },
  {
    numero: '03',
    titre: 'Fabrication',
    description:
      'Découpe numérique dans notre atelier de Tunis. Thermoformage, assemblage, ponçage progressif jusqu\'au grain 400. Chaque pièce est contrôlée avant expédition.',
  },
  {
    numero: '04',
    titre: 'Pose & finition',
    description:
      'Nos équipes interviennent sur chantier. Raccords invisibles, joints comblés, surface finale polie en place. La pose fait partie du geste artisan.',
  },
]

export default function Process() {
  return (
    <section className="section-padding bg-blanc-creme">
      <div className="container-site">
        <SectionTitle
          overline="Notre process"
          title="Du dessin&#10;à la dernière finition."
          theme="light"
        />

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-or-champagne/20 hidden md:block" aria-hidden="true" />

          <div className="space-y-0">
            {etapes.map((etape, i) => (
              <motion.div
                key={etape.numero}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 md:gap-12 pb-12 last:pb-0"
              >
                {/* Number */}
                <div className="shrink-0 relative">
                  <div className="w-14 h-14 border border-or-champagne/40 flex items-center justify-center bg-blanc-creme relative z-10">
                    <span className="font-serif font-light text-or-champagne text-xl">
                      {etape.numero}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-3">
                  <GoldDivider variant="left" className="mb-5 h-px opacity-60" />
                  <h3 className="font-serif font-light text-noir-profond text-2xl md:text-3xl mb-4">
                    {etape.titre}
                  </h3>
                  <p className="font-sans font-light text-sm text-gris-fume/70 leading-relaxed max-w-lg">
                    {etape.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
