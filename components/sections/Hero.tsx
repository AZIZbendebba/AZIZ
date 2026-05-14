'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ScrollIndicator from '@/components/widgets/ScrollIndicator'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[700px] overflow-hidden bg-noir-profond"
      aria-label="Section héro"
    >
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/cuisine-ilot.jpg"
          alt="Réalisation Solid Surface Tunisie — cuisine îlot central"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-noir-profond/65" />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%, rgba(10,10,10,0.3) 100%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center"
      >
        <div className="container-site">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overline-text mb-8"
          >
            Solid Surface Tunisie
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-cormorant font-light text-blanc-pur leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Votre intérieur mérite
            <br />
            <em className="not-italic text-or-champagne">une surface sans compromis.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-inter font-light text-gris-texte max-w-xl mb-12 text-base md:text-lg leading-relaxed"
          >
            Cuisines, salles de bain et espaces professionnels — surfaces Solid Surface
            et mobilier sur mesure, fabriqués sous le même toit à Tunis.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Link href="/contact" className="btn-primary">
              Démarrer mon projet
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link href="/realisations" className="btn-ghost">
              Découvrir nos réalisations
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <ScrollIndicator />
      </motion.div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block">
        <div
          className="w-px h-32 opacity-40"
          style={{
            background: 'linear-gradient(180deg, transparent, #C9A961, transparent)',
          }}
        />
      </div>
    </section>
  )
}
