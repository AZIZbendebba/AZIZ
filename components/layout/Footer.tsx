import Link from 'next/link'
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'
import { siteConfig } from '@/lib/data/seo'

const navColumns = [
  {
    heading: 'Surfaces sur mesure',
    links: [
      { href: '/cuisine', label: 'Cuisine Corian®' },
      { href: '/salle-de-bain', label: 'Salle de bain' },
      { href: '/espace-sante', label: 'Espace santé' },
      { href: '/espace-bureautique', label: 'Espace bureautique' },
      { href: '/professionnels', label: 'Pour les professionnels' },
    ],
  },
  {
    heading: 'Espace meuble',
    links: [
      { href: '/espace-meuble', label: 'Présentation' },
      { href: '/espace-meuble/cuisine', label: 'Cuisine' },
      { href: '/espace-meuble/dressing', label: 'Dressing' },
      { href: '/espace-meuble/meuble-salle-de-bain', label: 'Meuble salle de bain' },
    ],
  },
  {
    heading: 'Entreprise',
    links: [
      { href: '/realisations', label: 'Nos réalisations' },
      { href: '/a-propos', label: 'À propos' },
      { href: '/contact', label: 'Contact' },
      { href: '/mentions-legales', label: 'Mentions légales' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-black" aria-label="Pied de page">
      <GoldDivider />

      <div className="container-site pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Colonne marque */}
          <div className="lg:col-span-2">
            <Logo variant="blanc" className="mb-6" />
            <p className="font-sans font-light text-sm leading-relaxed mb-6 max-w-sm text-blanc-pur/70">
              Deux savoir-faire complémentaires au service de vos espaces : fabrication
              de surfaces Solid Surface et Corian® ainsi que de mobilier sur mesure,
              de la conception à la pose.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanc-pur/50 hover:text-or-champagne transition-colors duration-300"
                aria-label="Instagram Solid Surface Tunisie"
              >
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanc-pur/50 hover:text-or-champagne transition-colors duration-300"
                aria-label="LinkedIn Solid Surface Tunisie"
              >
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blanc-pur/50 hover:text-or-champagne transition-colors duration-300"
                aria-label="Facebook Solid Surface Tunisie"
              >
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Colonnes navigation */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="overline-text mb-6">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans font-light text-sm text-blanc-pur/60 hover:text-blanc-pur transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Coordonnées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 py-10 border-t border-gris-fume/30 border-b border-gris-fume/30">
          <div className="flex items-start gap-3">
            <MapPin size={16} strokeWidth={1.5} className="text-or-champagne mt-0.5 shrink-0" />
            <p className="font-sans font-light text-sm text-blanc-pur/70">
              {siteConfig.address.street}<br />
              {siteConfig.address.city}, {siteConfig.address.country}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={16} strokeWidth={1.5} className="text-or-champagne shrink-0" />
            <a
              href={siteConfig.address.phoneHref}
              className="font-sans font-light text-sm text-blanc-pur/70 hover:text-blanc-pur transition-colors"
            >
              {siteConfig.address.phone}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={16} strokeWidth={1.5} className="text-or-champagne shrink-0" />
            <a
              href={`mailto:${siteConfig.address.emails.com}`}
              className="font-sans font-light text-sm text-blanc-pur/70 hover:text-blanc-pur transition-colors"
            >
              {siteConfig.address.emails.com}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={16} strokeWidth={1.5} className="text-or-champagne shrink-0" />
            <p className="font-sans font-light text-sm text-blanc-pur/70">
              {siteConfig.hours}
            </p>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans font-light text-xs text-blanc-pur/30">
            © {new Date().getFullYear()} Solid Surface Tunisie. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/mentions-legales"
              className="font-sans font-light text-xs text-blanc-pur/30 hover:text-blanc-pur/60 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-confidentialite"
              className="font-sans font-light text-xs text-blanc-pur/30 hover:text-blanc-pur/60 transition-colors"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
