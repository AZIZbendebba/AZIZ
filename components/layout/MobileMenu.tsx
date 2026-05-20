'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'

const espaceMenubleLinks = [
  { href: '/espace-meuble/cuisine', label: 'Cuisine' },
  { href: '/espace-meuble/dressing', label: 'Dressing' },
  { href: '/espace-meuble/meuble-salle-de-bain', label: 'Meuble salle de bain' },
]

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/cuisine', label: 'Cuisine' },
  { href: '/salle-de-bain', label: 'Salle de bain' },
  { href: '/espace-sante', label: 'Espace santé' },
  { href: '/espace-bureautique', label: 'Bureautique' },
  { href: '/professionnels', label: 'Professionnels' },
  { href: '/realisations', label: 'Réalisations' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [espaceOpen, setEspaceOpen] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-noir-profond flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-gris-fume shrink-0">
            <Logo variant="blanc" />
            <button
              onClick={onClose}
              className="text-blanc-pur hover:text-or-champagne transition-colors duration-300"
              aria-label="Fermer le menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col px-8 py-6">
            {/* Espace Meuble avec sous-menu accordéon */}
            <div>
              <button
                onClick={() => setEspaceOpen((v) => !v)}
                className="flex items-center justify-between w-full py-4 font-serif text-3xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
              >
                Espace meuble
                <ChevronDown
                  size={20}
                  strokeWidth={1.5}
                  className={`transition-transform duration-300 ${espaceOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {espaceOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden pl-4 pb-2"
                  >
                    {espaceMenubleLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="block py-2 font-sans text-sm font-medium tracking-widest uppercase text-blanc-pur/70 hover:text-or-champagne transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <GoldDivider className="opacity-10" />

            {/* Liens principaux */}
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block py-4 font-serif text-3xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
                >
                  {link.label}
                </Link>
                <GoldDivider className="opacity-10" />
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.35 }}
            className="px-8 py-8 mt-auto shrink-0"
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
