'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'
import { siteConfig } from '@/lib/data/seo'

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-noir-profond">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cuisine-hachicha.jpg"
          alt="Showroom Solid Surface Tunisie"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-noir-profond/60" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-site">
          <GoldDivider className="mb-20" />

          <div className="max-w-3xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overline-text mb-8"
            >
              Parlons de votre projet
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-cormorant font-light text-blanc-pur mb-8"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
            >
              Votre espace mérite
              <br />
              <span className="text-or-champagne">une surface à sa mesure.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter font-light text-gris-texte text-base leading-relaxed mb-12 max-w-xl mx-auto"
            >
              Architectes, promoteurs, particuliers — nous répondons à chaque
              demande de devis sous 48 heures. Venez découvrir nos matières au showroom.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact" className="btn-primary text-sm">
                Demander un devis
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
              <a
                href={`tel:${siteConfig.address.phone}`}
                className="btn-ghost text-sm"
              >
                <Phone size={14} strokeWidth={1.5} />
                {siteConfig.address.phone}
              </a>
            </motion.div>
          </div>

          <GoldDivider className="mt-20" />
        </div>
      </div>
    </section>
  )
}
