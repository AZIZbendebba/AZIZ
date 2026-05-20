'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { realisations } from '@/lib/data/realisations'

const featured = realisations.filter((r) => r.featured).slice(0, 4)

export default function Realisations() {
  return (
    <section className="section-padding bg-noir-profond">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <SectionTitle
            overline="Réalisations sélectionnées"
            title="Chaque projet,&#10;une signature."
            className="mb-0"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/realisations" className="btn-ghost whitespace-nowrap">
              Voir toutes les réalisations
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {featured[0] && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <RealisationCard realisation={featured[0]} tall />
            </motion.div>
          )}

          <div className="md:col-span-5 flex flex-col gap-4">
            {featured[1] && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <RealisationCard realisation={featured[1]} />
              </motion.div>
            )}
            {featured[2] && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <RealisationCard realisation={featured[2]} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function RealisationCard({
  realisation,
  tall = false,
}: {
  realisation: (typeof realisations)[0]
  tall?: boolean
}) {
  return (
    <Link
      href={`/realisations/${realisation.slug}`}
      className={`group relative block overflow-hidden bg-gris-fume ${tall ? 'h-[500px] md:h-[640px]' : 'h-60 md:h-[308px]'}`}
    >
      <Image
        src={realisation.imageHero}
        alt={realisation.titre}
        fill
        className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 58vw, 700px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="overline-text mb-2 text-or-champagne/70">{realisation.secteur} , {realisation.lieu}</p>
            <h3 className="font-serif font-light text-blanc-pur text-xl md:text-2xl group-hover:text-or-champagne transition-colors duration-300">
              {realisation.titre}
            </h3>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-4 shrink-0">
            <ArrowRight size={20} strokeWidth={1.5} className="text-or-champagne" />
          </div>
        </div>
      </div>
    </Link>
  )
}
