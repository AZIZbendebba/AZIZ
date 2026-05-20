'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

const espaceMenubleLinks = [
  { href: '/espace-meuble/cuisine', label: 'Cuisine' },
  { href: '/espace-meuble/dressing', label: 'Dressing' },
  { href: '/espace-meuble/meuble-salle-de-bain', label: 'Meuble salle de bain' },
]

const navLinks = [
  { href: '/cuisine', label: 'Cuisine' },
  { href: '/salle-de-bain', label: 'Salle de bain' },
  { href: '/espace-sante', label: 'Espace santé' },
  { href: '/espace-bureautique', label: 'Bureautique' },
  { href: '/professionnels', label: 'Professionnels' },
  { href: '/realisations', label: 'Réalisations' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-noir-profond/95 backdrop-blur-sm border-b border-gris-fume/50'
            : 'bg-transparent',
        )}
      >
        <div className="container-site flex items-center justify-between h-20 lg:h-24">
          <Logo variant="blanc" />

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Navigation principale">
            {/* Espace Meuble avec dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/espace-meuble"
                className="flex items-center gap-1 font-sans text-[0.65rem] font-medium tracking-[0.15em] uppercase text-blanc-pur hover:text-or-champagne transition-colors duration-300 group"
              >
                Espace meuble
                <ChevronDown
                  size={12}
                  strokeWidth={2}
                  className={cn(
                    'transition-transform duration-300',
                    dropdownOpen ? 'rotate-180' : 'rotate-0',
                  )}
                />
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-or-champagne transition-all duration-300 group-hover:w-full" />
              </Link>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full left-0 mt-3 w-52 bg-noir-sec border border-gris-fume/60 py-2"
                  >
                    {espaceMenubleLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-5 py-3 font-sans text-[0.65rem] font-medium tracking-[0.12em] uppercase text-blanc-pur hover:text-or-champagne hover:bg-gris-fume/40 transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Liens principaux */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[0.65rem] font-medium tracking-[0.15em] uppercase text-blanc-pur hover:text-or-champagne transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-or-champagne transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-primary text-[0.65rem]"
            >
              Devis gratuit
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden text-blanc-pur hover:text-or-champagne transition-colors duration-300"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
