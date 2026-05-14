'use client'

import { motion } from 'framer-motion'
import GoldDivider from '@/components/shared/GoldDivider'

const etapes = [
  {
    num: '01',
    titre: 'Design',
    texte:
      'Conception sur mesure avec votre architecte ou notre bureau d\'études. Nous modélisons surfaces et mobilier ensemble pour garantir une cohérence parfaite.',
  },
  {
    num: '02',
    titre: 'Atelier',
    texte:
      'Fabrication intégrée à Tunis. Sous le même toit, nos équipes façonnent les surfaces Solid Surface et le mobilier qui les accueille — caissons, façades, îlots, dressings, rangements.',
  },
  {
    num: '03',
    titre: 'Pose',
    texte:
      'Installation par nos équipes, sans sous-traitance. Délais maîtrisés, qualité garantie, finitions soignées. Un seul interlocuteur du début à la fin.',
  },
]

export default function NotreDifference() {
  return (
    <section className="section-padding bg-noir-profond">
      <div className="container-site">
        <div className="max-w-2xl mb-16">
          <p className="overline-text mb-6">Notre différence</p>
          <h2
            className="font-cormorant font-light text-blanc-pur mb-8"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Une seule équipe,
            <br />
            <span className="text-or-champagne">du dessin à la pose.</span>
          </h2>
          <p className="font-inter font-light text-gris-texte text-sm leading-relaxed">
            Notre intégration verticale est notre signature : conception, fabrication et pose
            réalisées par les mêmes équipes. Vous ne traitez ni avec un cuisiniste, ni avec
            un fournisseur de Corian, ni avec un menuisier séparé. Vous traitez avec nous,
            de A à Z.
          </p>
        </div>

        <GoldDivider className="mb-16 opacity-30" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gris-fume/20">
          {etapes.map((e, i) => (
            <motion.div
              key={e.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-noir-profond p-10 lg:p-12 border border-gris-fume/20"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="font-cormorant text-or-champagne/60 text-5xl font-light leading-none">
                  {e.num}
                </span>
                <GoldDivider variant="vertical" className="h-8 opacity-30" />
                <p className="font-inter text-[0.6rem] tracking-[0.2em] uppercase text-or-champagne">
                  {e.titre}
                </p>
              </div>
              <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                {e.texte}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
