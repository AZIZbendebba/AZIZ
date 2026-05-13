'use client'

import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/data/seo'

export default function WhatsAppFloat() {
  const message = encodeURIComponent('Bonjour, je souhaite obtenir des informations sur vos réalisations.')
  const url = `https://wa.me/${siteConfig.address.whatsapp}?text=${message}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-8 right-6 z-30 flex items-center gap-3 group"
      aria-label="Nous contacter sur WhatsApp"
    >
      <span className="hidden md:block font-inter text-[0.6rem] tracking-[0.12em] uppercase text-gris-texte opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Écrire sur WhatsApp
      </span>
      <div className="w-12 h-12 bg-gris-fume border border-or-champagne/30 hover:border-or-champagne flex items-center justify-center transition-all duration-300 hover:bg-or-champagne/10">
        <MessageCircle size={20} strokeWidth={1.5} className="text-or-champagne" />
      </div>
    </motion.a>
  )
}
