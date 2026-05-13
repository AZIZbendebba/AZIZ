'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/le-groupe', label: 'Le Groupe' },
  { href: '/savoir-faire', label: 'Savoir-faire' },
  { href: '/secteurs/residentiel', label: 'Secteurs' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/contact', label: 'Contact' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-noir-profond flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-gris-fume">
            <Logo variant="blanc" />
            <button
              onClick={onClose}
              className="text-gris-texte hover:text-or-champagne transition-colors duration-300"
              aria-label="Fermer le menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col flex-1 justify-center px-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-5 font-cormorant text-4xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
                >
                  {link.label}
                </Link>
                <GoldDivider className="opacity-10" />
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="px-8 py-8"
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="btn-primary w-full justify-center"
            >
              Demander un devis
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
