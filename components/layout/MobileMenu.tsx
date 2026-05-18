'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, ChevronDown } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/le-groupe', label: 'Le Groupe' },
  { href: '/savoir-faire', label: 'Savoir-faire' },
  { href: '/secteurs/residentiel', label: 'Secteurs' },
  { href: '/realisations', label: 'Réalisations' },
]

const meubleLinks = [
  { href: '/meuble', label: 'Accueil Meuble' },
  { href: '/meuble/cuisine', label: 'Meuble cuisine' },
  { href: '/meuble/dressing', label: 'Meuble dressing' },
  { href: '/meuble/salle-de-bain', label: 'Meuble salle de bain' },
]

type MobileMenuProps = {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [meubleOpen, setMeubleOpen] = useState(false)

  const handleClose = () => {
    setMeubleOpen(false)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 bg-noir-profond flex flex-col overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-6 border-b border-gris-fume">
            <Logo variant="blanc" />
            <button
              onClick={handleClose}
              className="text-gris-texte hover:text-or-champagne transition-colors duration-300"
              aria-label="Fermer le menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col flex-1 justify-center px-8 py-8">
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
                  onClick={handleClose}
                  className="block py-5 font-cormorant text-4xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
                >
                  {link.label}
                </Link>
                <GoldDivider className="opacity-10" />
              </motion.div>
            ))}

            {/* Meuble dropdown */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: navLinks.length * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                onClick={() => setMeubleOpen((v) => !v)}
                className="w-full flex items-center justify-between py-5 font-cormorant text-4xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
                aria-expanded={meubleOpen}
              >
                Meuble
                <ChevronDown
                  size={20}
                  strokeWidth={1}
                  className={`transition-transform duration-300 ${meubleOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {meubleOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden pl-4 mb-2"
                  >
                    {meubleLinks.map((sub, i) => (
                      <motion.li
                        key={sub.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Link
                          href={sub.href}
                          onClick={handleClose}
                          className="block py-3 font-inter text-[0.65rem] tracking-[0.15em] uppercase text-gris-texte hover:text-or-champagne transition-colors duration-300"
                        >
                          {sub.label}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <GoldDivider className="opacity-10" />
            </motion.div>

            {/* Contact link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: (navLinks.length + 1) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/contact"
                onClick={handleClose}
                className="block py-5 font-cormorant text-4xl font-light text-blanc-pur hover:text-or-champagne transition-colors duration-300"
              >
                Contact
              </Link>
              <GoldDivider className="opacity-10" />
            </motion.div>
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
              onClick={handleClose}
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
