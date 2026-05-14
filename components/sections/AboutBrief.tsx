'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'

export default function AboutBrief() {
  return (
    <section className="section-padding bg-gris-fume">
      <div className="container-site max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overline-text mb-8"
        >
          Notre engagement
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant font-light text-blanc-pur mb-8"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', lineHeight: 1.2 }}
        >
          L&apos;émotion d&apos;une surface,
          <br />
          <span className="text-or-champagne">la puissance d&apos;une création.</span>
        </motion.h2>

        <GoldDivider className="mb-8 opacity-40" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-inter font-light text-gris-texte text-base leading-relaxed"
        >
          Depuis plus de 15 ans, nous accompagnons les familles tunisiennes, les couples
          qui s&apos;installent et les professionnels qui exigent le meilleur. Notre atelier à
          Tunis fabrique chaque pièce sur mesure, sans joint visible, sans compromis sur la
          qualité. Le Solid Surface n&apos;est pas un matériau ordinaire. Il se répare, se façonne,
          se renouvelle. C&apos;est un investissement pour des décennies, au service de votre quotidien.
        </motion.p>
      </div>
    </section>
  )
}
