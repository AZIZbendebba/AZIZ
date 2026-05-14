'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { univers } from '@/lib/data/univers'
import SectionTitle from '@/components/shared/SectionTitle'

export default function UniversGrid() {
  return (
    <section className="section-padding bg-noir-profond">
      <div className="container-site">
        <SectionTitle
          overline="Nos univers"
          title="Du sur mesure&#10;pour chaque espace."
          description="Quatre univers d'usage, une seule exigence : zéro joint visible, 100 % sur mesure."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {univers.map((u, i) => (
            <motion.div
              key={u.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={u.href}
                className="group relative block overflow-hidden bg-gris-fume h-80"
              >
                <Image
                  src={u.image}
                  alt={u.nom}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/90 via-noir-profond/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-cormorant font-light text-blanc-pur text-2xl mb-1 group-hover:text-or-champagne transition-colors duration-300">
                    {u.nom}
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte leading-relaxed line-clamp-2">
                    {u.sousTitre}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-or-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-inter text-[0.6rem] tracking-[0.12em] uppercase">Découvrir</span>
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
