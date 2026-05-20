'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'

const chiffres = [
  { valeur: '15+', label: 'ans d\'expertise', detail: 'Fondée en 2004, repositionnée par la nouvelle génération.' },
  { valeur: '500+', label: 'projets réalisés', detail: 'Du studio de 40 m² à la clinique de 3 000 m².' },
  { valeur: '6', label: 'secteurs d\'activité', detail: 'Résidentiel, hôtellerie, healthcare, commercial, institutionnel, tertiaire.' },
  { valeur: '2', label: 'entités complémentaires', detail: 'Solid Surface Tunisie.' },
]

export default function Confiance() {
  return (
    <section className="section-padding bg-noir-pur overflow-hidden">
      <div className="container-site">
        <GoldDivider className="mb-20" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gris-fume/30">
          {chiffres.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-noir-pur p-10 lg:p-12 flex flex-col"
            >
              <p
                className="font-serif font-light text-or-champagne mb-3 leading-none"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
              >
                {item.valeur}
              </p>
              <p className="overline-text mb-4">{item.label}</p>
              <p className="font-sans font-light text-xs text-blanc-pur/60 leading-relaxed mt-auto pt-4 border-t border-gris-fume/40">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        <GoldDivider className="mt-20" />
      </div>
    </section>
  )
}
