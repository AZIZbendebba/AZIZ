'use client'

import { motion } from 'framer-motion'
import { temoignages } from '@/lib/data/temoignages'
import SectionTitle from '@/components/shared/SectionTitle'
import GoldDivider from '@/components/shared/GoldDivider'

export default function Temoignages() {
  return (
    <section className="section-padding bg-noir-profond">
      <div className="container-site">
        <SectionTitle
          overline="Témoignages"
          title="Ce que disent&#10;nos clients."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {temoignages.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-gris-fume p-8 flex flex-col"
            >
              <div className="text-or-champagne font-cormorant text-5xl font-light leading-none mb-4">&ldquo;</div>
              <p className="font-inter font-light text-sm text-gris-texte leading-relaxed flex-1 mb-6">
                {t.texte}
              </p>
              <GoldDivider variant="left" className="mb-4 opacity-50" />
              <p className="font-inter font-light text-xs text-blanc-pur tracking-wide">{t.auteur}</p>
              <p className="font-inter font-light text-xs text-gris-texte/60 mt-1">{t.contexte}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
