import Link from 'next/link'
import { Instagram, Linkedin, Facebook, MapPin, Phone, Mail, Clock } from 'lucide-react'
import Logo from '@/components/shared/Logo'
import GoldDivider from '@/components/shared/GoldDivider'
import { siteConfig } from '@/lib/data/seo'

const col2 = {
  heading: 'Univers',
  links: [
    { href: '/cuisine', label: 'Cuisine' },
    { href: '/salle-de-bain', label: 'Salle de Bain' },
    { href: '/espace-sante', label: 'Espace Santé' },
    { href: '/bureautique', label: 'Bureautique' },
    { href: '/nuancier', label: 'Nuancier' },
  ],
}

const col3 = {
  heading: 'Entreprise',
  links: [
    { href: '/a-propos', label: 'À propos' },
    { href: '/savoir-faire', label: 'Savoir-faire' },
    { href: '/realisations', label: 'Réalisations' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Devis gratuit' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-noir-pur" aria-label="Pied de page">
      <GoldDivider />

      <div className="container-site pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1 — Brand */}
          <div>
            <Logo variant="blanc" className="mb-6" />
            <p className="font-inter font-light text-gris-texte text-sm leading-relaxed mb-6 max-w-xs">
              Surfaces Solid Surface et mobilier sur mesure — cuisines, salles de bain et espaces
              professionnels conçus dans leur intégralité. Fabriqués à Tunis, livrés partout en Tunisie.
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

          {/* Col 2 — Univers */}
          <div>
            <h3 className="overline-text mb-6">{col2.heading}</h3>
            <ul className="space-y-3">
              {col2.links.map((link) => (
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

          {/* Col 3 — Entreprise */}
          <div>
            <h3 className="overline-text mb-6">{col3.heading}</h3>
            <ul className="space-y-3">
              {col3.links.map((link) => (
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

          {/* Col 4 — Contact */}
          <div>
            <h3 className="overline-text mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} strokeWidth={1.5} className="text-or-champagne mt-0.5 shrink-0" />
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.city}
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} strokeWidth={1.5} className="text-or-champagne shrink-0" />
                <div className="space-y-1">
                  <a
                    href={`tel:${siteConfig.address.phone}`}
                    className="block font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors"
                  >
                    {siteConfig.address.phone}
                  </a>
                  <a
                    href={`tel:${siteConfig.address.phone2}`}
                    className="block font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors"
                  >
                    {siteConfig.address.phone2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} strokeWidth={1.5} className="text-or-champagne shrink-0" />
                <a
                  href={`mailto:${siteConfig.address.email}`}
                  className="font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors"
                >
                  {siteConfig.address.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={15} strokeWidth={1.5} className="text-or-champagne mt-0.5 shrink-0" />
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  Lun–Ven : 8h30–18h00<br />
                  Sam : 8h00–14h00
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gris-fume/30">
          <p className="font-inter font-light text-xs text-gris-texte/50">
            © {new Date().getFullYear()} Solid Surface Tunisie. Tous droits réservés.
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
