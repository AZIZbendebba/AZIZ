'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'

const piliers = [
  { chiffre: '15+', label: 'Années d\'expertise' },
  { chiffre: '0', label: 'Joint visible' },
  { chiffre: '100%', label: 'Sur mesure' },
  { chiffre: '∞', label: 'Réparable à neuf' },
]

export default function Piliers() {
  return (
    <section className="bg-gris-fume py-16">
      <div className="container-site">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gris-fume/50">
          {piliers.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-noir-profond p-10 text-center"
            >
              <p className="font-cormorant font-light text-or-champagne leading-none mb-3"
                style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
                {p.chiffre}
              </p>
              <GoldDivider className="mb-3 opacity-40" />
              <p className="font-inter font-light text-xs tracking-[0.12em] uppercase text-gris-texte">
                {p.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
