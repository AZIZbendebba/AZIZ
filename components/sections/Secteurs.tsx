'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionTitle from '@/components/shared/SectionTitle'
import { secteurs } from '@/lib/data/secteurs'

export default function Secteurs() {
  return (
    <section className="section-padding bg-blanc-creme">
      <div className="container-site">
        <SectionTitle
          overline="Nos secteurs"
          title="Partout où la matière&#10;fait la différence."
          description="Du résidentiel haut de gamme à l'hôtellerie de luxe, du healthcare à l'institutionnel — notre savoir-faire s'adapte à chaque exigence."
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-noir-profond/10">
          {secteurs.map((secteur, i) => (
            <motion.div
              key={secteur.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/secteurs/${secteur.slug}`}
                className="group relative block overflow-hidden bg-noir-profond h-72 md:h-80"
              >
                <Image
                  src={secteur.image}
                  alt={secteur.nom}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/90 via-transparent to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-cormorant font-light text-blanc-pur text-2xl md:text-3xl mb-2 group-hover:text-or-champagne transition-colors duration-300">
                    {secteur.nom}
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte mb-4">
                    {secteur.description}
                  </p>
                  <div className="flex items-center gap-2 text-or-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-inter text-[0.6rem] tracking-[0.15em] uppercase">Découvrir</span>
                    <ArrowRight size={12} strokeWidth={1.5} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
