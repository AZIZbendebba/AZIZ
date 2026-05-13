'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/le-groupe', label: 'Le Groupe' },
  { href: '/savoir-faire', label: 'Savoir-faire' },
  { href: '/secteurs/residentiel', label: 'Secteurs' },
  { href: '/realisations', label: 'Réalisations' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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

          <nav className="hidden lg:flex items-center gap-10" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-inter text-[0.65rem] font-500 tracking-[0.15em] uppercase text-gris-texte hover:text-or-champagne transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-or-champagne transition-all duration-400 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden lg:inline-flex btn-primary text-[0.65rem]"
            >
              Devis
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
