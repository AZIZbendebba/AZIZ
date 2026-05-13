import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import DevisForm from '@/components/forms/DevisForm'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'
import { siteConfig } from '@/lib/data/seo'

export const metadata: Metadata = {
  title: 'Contact & Devis',
  description:
    'Demandez un devis pour votre projet sur mesure — Solid Surface, mobilier, agencement complet. Réponse sous 48 heures.',
}

const infos = [
  {
    icon: MapPin,
    label: 'Showroom & Atelier',
    value: `${siteConfig.address.street}, ${siteConfig.address.city}`,
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: siteConfig.address.phone,
    href: `tel:${siteConfig.address.phone}`,
  },
  {
    icon: Mail,
    label: 'Email',
    value: siteConfig.address.email,
    href: `mailto:${siteConfig.address.email}`,
  },
  {
    icon: Clock,
    label: 'Horaires',
    value: 'Lun – Ven : 8h30 – 18h00 | Sam : 9h00 – 13h00',
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-20 bg-noir-profond">
        <div className="container-site">
          <p className="overline-text mb-6">Contact</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Parlons de
            <br />
            <span className="text-or-champagne">votre projet.</span>
          </h1>
          <p className="font-inter font-light text-gris-texte max-w-lg leading-relaxed">
            Architectes, promoteurs, particuliers — nous répondons à chaque demande
            sous 48 heures ouvrées. Venez découvrir nos matières au showroom.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* Main content */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20">
            {/* Form */}
            <div className="lg:col-span-2">
              <SectionTitle
                overline="Formulaire de devis"
                title="Décrivez votre projet."
                description="Complétez ce formulaire en 3 étapes. Plus vous nous donnez de détails, plus notre réponse sera précise."
              />
              <DevisForm />
            </div>

            {/* Sidebar */}
            <div>
              <SectionTitle
                overline="Nous trouver"
                title="Showroom & Atelier."
              />

              <div className="space-y-6 mb-10">
                {infos.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-gris-fume flex items-center justify-center shrink-0">
                      <Icon size={16} strokeWidth={1.5} className="text-or-champagne" />
                    </div>
                    <div>
                      <p className="overline-text mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="font-inter font-light text-sm text-gris-texte hover:text-blanc-pur transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="font-inter font-light text-sm text-gris-texte">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <GoldDivider className="mb-8" />

              {/* WhatsApp */}
              <div className="border border-gris-fume p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={16} strokeWidth={1.5} className="text-or-champagne" />
                  <p className="overline-text">WhatsApp Business</p>
                </div>
                <p className="font-inter font-light text-sm text-gris-texte mb-4">
                  Pour une réponse rapide, contactez-nous directement sur WhatsApp.
                </p>
                <a
                  href={`https://wa.me/${siteConfig.address.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center text-xs"
                >
                  Écrire sur WhatsApp
                </a>
              </div>

              {/* Map placeholder */}
              <div className="mt-6 h-48 bg-gris-fume border border-gris-fume flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={24} strokeWidth={1} className="text-or-champagne mx-auto mb-2" />
                  <p className="font-inter font-light text-xs text-gris-texte">
                    Zone industrielle, Tunis
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
