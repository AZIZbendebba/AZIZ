'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'

const proprietes = [
  {
    titre: 'Sans joint',
    description: 'Les raccords sont poncés et polis à l\'identique de la surface. Le joint n\'existe pas.',
  },
  {
    titre: 'Antibactérien',
    description: 'Surface non poreuse, certifiée NSF pour les environnements alimentaires et médicaux.',
  },
  {
    titre: 'Thermoformable',
    description: 'La matière se courbe, s\'enroule, épouse les formes les plus complexes sans rupture.',
  },
  {
    titre: 'Réparable',
    description: 'Une rayure, un choc , le Solid Surface se ponce et retrouve son aspect d\'origine.',
  },
]

export default function Matiere() {
  return (
    <section className="section-padding bg-noir-profond overflow-hidden">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: text */}
          <div>
            <SectionTitle
              overline="La matière"
              title="Le Solid Surface,&#10;sans compromis."
              description="Développé par DuPont™ sous le nom Corian®, le Solid Surface est une matière minérale et résine acrylique de nouvelle génération , homogène dans toute son épaisseur, sans pore, sans joint, réparable à vie."
            />

            <div className="space-y-8 mt-8">
              {proprietes.map((prop, i) => (
                <motion.div
                  key={prop.titre}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-6"
                >
                  <div className="shrink-0 w-px bg-or-champagne/40 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-or-champagne" style={{ height: '40%' }} />
                  </div>
                  <div>
                    <h3 className="font-serif font-light text-blanc-pur text-xl mb-2">
                      {prop.titre}
                    </h3>
                    <p className="font-sans font-light text-sm text-blanc-pur/60 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: images */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/images/plan-travail-beige.jpg"
                alt="Détail surface Corian , texture et finition"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/40 to-transparent" />
            </motion.div>

            {/* Floating detail image */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-8 -left-8 w-48 h-48 md:w-64 md:h-64 border-4 border-noir-profond overflow-hidden hidden md:block"
            >
              <Image
                src="/images/corian-detail.jpg"
                alt="Détail Corian , plan de travail"
                fill
                className="object-cover"
                sizes="256px"
              />
            </motion.div>

            {/* Gold accent frame */}
            <div
              className="absolute -top-4 -right-4 w-32 h-32 border border-or-champagne/20 hidden lg:block"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
