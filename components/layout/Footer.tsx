import Link from 'next/link'
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'
import { siteConfig } from '@/lib/data/seo'

const navColumns = [
  {
    heading: 'Le Groupe',
    links: [
      { href: '/le-groupe', label: 'Notre histoire' },
      { href: '/savoir-faire', label: 'Savoir-faire' },
      { href: '/savoir-faire#solid-surface', label: 'Solid Surface' },
      { href: '/savoir-faire#mobilier', label: 'Mobilier sur mesure' },
    ],
  },
  {
    heading: 'Secteurs',
    links: [
      { href: '/secteurs/residentiel', label: 'Résidentiel' },
      { href: '/secteurs/hotellerie', label: 'Hôtellerie' },
      { href: '/secteurs/healthcare', label: 'Healthcare' },
      { href: '/secteurs/commercial', label: 'Commercial' },
      { href: '/secteurs/institutionnel', label: 'Institutionnel' },
    ],
  },
  {
    heading: 'Réalisations',
    links: [
      { href: '/realisations', label: 'Toutes les réalisations' },
      { href: '/realisations?secteur=residentiel', label: 'Résidentiel' },
      { href: '/realisations?secteur=hotellerie', label: 'Hôtellerie' },
      { href: '/contact', label: 'Demander un devis' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-noir-pur" aria-label="Pied de page">
      <GoldDivider />

      <div className="container-site pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Logo variant="blanc" className="mb-6" />
            <p className="font-inter font-light text-gris-texte text-sm leading-relaxed mb-6 max-w-sm">
              Deux entités, une seule promesse — concevoir, fabriquer et installer
              chaque surface et chaque meuble de votre lieu de vie,
              du plan à la pose.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-texte hover:text-or-champagne transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-texte hover:text-or-champagne transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gris-texte hover:text-or-champagne transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {navColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="overline-text mb-6">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 py-10 border-t border-gris-fume/30 border-b border-gris-fume/30">
          <div className="flex items-start gap-3">
            <MapPin size={16} strokeWidth={1.5} className="text-or-champagne mt-0.5 shrink-0" />
            <p className="font-inter font-light text-sm text-gris-texte">
              {siteConfig.address.street}<br />
              {siteConfig.address.city}, {siteConfig.address.country}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} strokeWidth={1.5} className="text-or-champagne shrink-0" />
            <a
              href={`tel:${siteConfig.address.phone}`}
              className="font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors"
            >
              {siteConfig.address.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} strokeWidth={1.5} className="text-or-champagne shrink-0" />
            <p className="font-inter font-light text-sm text-gris-texte">
              Lun – Ven : 8h30 – 18h00
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter font-light text-xs text-gris-texte/50">
            © {new Date().getFullYear()} Solid Surface Tunisie — Techno-Logika SA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="font-inter font-light text-xs text-gris-texte/50 hover:text-gris-texte transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="font-inter font-light text-xs text-gris-texte/50 hover:text-gris-texte transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
