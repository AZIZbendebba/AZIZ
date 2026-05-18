'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import MobileMenu from './MobileMenu'
import { cn } from '@/lib/utils'

type NavLink = {
  type: 'link'
  href: string
  label: string
}

type NavDropdown = {
  type: 'dropdown'
  label: string
  items: { href: string; label: string }[]
}

type NavItem = NavLink | NavDropdown

const navItems: NavItem[] = [
  { type: 'link', href: '/le-groupe', label: 'Le Groupe' },
  { type: 'link', href: '/savoir-faire', label: 'Savoir-faire' },
  { type: 'link', href: '/secteurs/residentiel', label: 'Secteurs' },
  { type: 'link', href: '/realisations', label: 'Réalisations' },
  {
    type: 'dropdown',
    label: 'Meuble',
    items: [
      { href: '/meuble', label: 'Accueil Meuble' },
      { href: '/meuble/cuisine', label: 'Meuble cuisine' },
      { href: '/meuble/dressing', label: 'Meuble dressing' },
      { href: '/meuble/salle-de-bain', label: 'Meuble salle de bain' },
    ],
  },
]

const linkClass =
  'font-inter text-[0.65rem] font-500 tracking-[0.15em] uppercase text-gris-texte hover:text-or-champagne transition-colors duration-300 relative group'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(label)
  }

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

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
            {navItems.map((item) => {
              if (item.type === 'link') {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={linkClass}
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-or-champagne transition-all duration-400 group-hover:w-full" />
                  </Link>
                )
              }

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={cn(linkClass, 'flex items-center gap-1 bg-transparent border-0 cursor-pointer')}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      size={10}
                      strokeWidth={1.5}
                      className={cn(
                        'transition-transform duration-300',
                        openDropdown === item.label && 'rotate-180',
                      )}
                    />
                    <span className={cn(
                      'absolute -bottom-0.5 left-0 h-px bg-or-champagne transition-all duration-400',
                      openDropdown === item.label ? 'w-full' : 'w-0 group-hover:w-full',
                    )} />
                  </button>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-noir-profond/97 backdrop-blur-sm border border-gris-fume/50 min-w-[200px]"
                        onMouseEnter={() => handleMouseEnter(item.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {/* gold top border accent */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-or-champagne to-transparent" />
                        <ul className="py-3">
                          {item.items.map((sub, i) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={() => setOpenDropdown(null)}
                                className={cn(
                                  'block px-6 py-3 font-inter text-[0.6rem] tracking-[0.15em] uppercase',
                                  'text-gris-texte hover:text-or-champagne hover:bg-gris-fume/30',
                                  'transition-colors duration-200',
                                  i > 0 && 'border-t border-gris-fume/20',
                                )}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
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
