'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'

const entites = [
  {
    nom: 'Solid Surface Tunisie',
    sous_titre: 'La matière. Les surfaces.',
    description:
      'Transformateur et fabricant agréé de surfaces solides Corian®. Plans de travail sans joint, vasques intégrées, revêtements muraux, escaliers — chaque surface est taillée, thermoformée et polie dans notre atelier à Tunis.',
    points: [
      'Surfaces sans joint, sans pore',
      'Antibactérien certifié',
      'Thermoformable, réparable',
      'Plus de 100 coloris disponibles',
    ],
    href: '/savoir-faire#solid-surface',
  },
  {
    nom: 'Techno-Logika SA',
    sous_titre: 'Le mobilier. L\'agencement.',
    description:
      'Atelier de menuiserie et d\'agencement sur mesure. Cuisines, salles de bain, dressings, bibliothèques, mobilier de bureau — chaque meuble est conçu en dialogue avec les surfaces pour former un ensemble cohérent.',
    points: [
      'Mobilier entièrement sur mesure',
      'Essences nobles et laques haut de gamme',
      'Quincaillerie Blum & Häfele',
      'Pose et finition par nos équipes',
    ],
    href: '/savoir-faire#mobilier',
  },
]

export default function GroupePresentation() {
  return (
    <section className="section-padding bg-gris-fume">
      <div className="container-site">
        <SectionTitle
          overline="Notre groupe"
          title="Deux entités,&#10;une seule vision."
          description="Solid Surface Tunisie et Techno-Logika SA forment un groupe intégré capable de prendre en charge chaque projet de A à Z — de la surface au meuble, du dessin à la pose."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gris-fume/50 mt-4">
          {entites.map((entite, i) => (
            <motion.div
              key={entite.nom}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-noir-profond border border-gris-fume p-10 lg:p-14 group hover:border-or-champagne/30 transition-colors duration-500"
            >
              <p className="overline-text mb-4">{entite.sous_titre}</p>
              <h3 className="font-cormorant font-light text-blanc-pur text-3xl md:text-4xl mb-6">
                {entite.nom}
              </h3>
              <GoldDivider variant="left" className="mb-8" />
              <p className="font-inter font-light text-gris-texte text-sm leading-relaxed mb-8">
                {entite.description}
              </p>
              <ul className="space-y-3 mb-10">
                {entite.points.map((point) => (
                  <li key={point} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-none bg-or-champagne shrink-0" />
                    <span className="font-inter font-light text-sm text-gris-texte">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={entite.href}
                className="font-inter text-[0.65rem] font-500 tracking-[0.15em] uppercase text-or-champagne hover:text-or-clair inline-flex items-center gap-2 transition-colors duration-300 group"
              >
                En savoir plus
                <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 text-center"
        >
          <p className="font-cormorant font-light italic text-blanc-pur/60 text-2xl md:text-3xl max-w-3xl mx-auto">
            « Ensemble, nous prenons en charge votre projet de A à Z —
            de la première esquisse à la dernière passe de ponçage. »
          </p>
        </motion.div>
      </div>
    </section>
  )
}
