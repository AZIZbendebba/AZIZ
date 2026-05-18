'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'

const etapes = [
  {
    numero: '01',
    titre: 'Écoute',
    description:
      'Rencontre sur site ou en showroom. Nous analysons vos besoins, vos contraintes d\'espace et vos envies de finitions. Aucun projet ne démarre sans avoir été compris.',
  },
  {
    numero: '02',
    titre: 'Conception 3D',
    description:
      'Notre bureau d\'études modélise votre meuble en 3D. Vous visualisez les cotes, les volumes, les matières et les couleurs avant que la moindre planche ne soit découpée.',
  },
  {
    numero: '03',
    titre: 'Fabrication',
    description:
      'Découpe numérique dans notre atelier de Tunis. Caissons, façades, quincaillerie Blum — chaque élément est fabriqué et contrôlé avant expédition sur chantier.',
  },
  {
    numero: '04',
    titre: 'Livraison',
    description:
      'Livraison coordonnée avec votre calendrier de chantier. Les pièces arrivent conditionnées, numérotées et prêtes à la pose — sans improvisation, sans attente.',
  },
  {
    numero: '05',
    titre: 'Pose & SAV',
    description:
      'Nos équipes installent le meuble et posent le plan de travail Solid Surface en un seul passage. Après la livraison, un service après-vente réactif assure la durabilité de votre investissement.',
  },
]

export default function MeubleProcess() {
  return (
    <section className="section-padding bg-blanc-creme">
      <div className="container-site">
        <SectionTitle
          overline="Notre méthode"
          title="De l'écoute&#10;à la dernière finition."
          theme="light"
        />

        <div className="relative">
          <div className="absolute left-[2.75rem] top-8 bottom-8 w-px bg-or-champagne/20 hidden md:block" aria-hidden="true" />
          <div className="space-y-0">
            {etapes.map((etape, i) => (
              <motion.div
                key={etape.numero}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-8 md:gap-12 pb-12 last:pb-0"
              >
                <div className="shrink-0 relative">
                  <div className="w-14 h-14 border border-or-champagne/40 flex items-center justify-center bg-blanc-creme relative z-10">
                    <span className="font-cormorant font-light text-or-champagne text-xl">
                      {etape.numero}
                    </span>
                  </div>
                </div>
                <div className="pt-3">
                  <GoldDivider variant="left" className="mb-5 h-px opacity-60" />
                  <h3 className="font-cormorant font-light text-noir-profond text-2xl md:text-3xl mb-4">
                    {etape.titre}
                  </h3>
                  <p className="font-inter font-light text-sm text-gris-fume/70 leading-relaxed max-w-lg">
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
