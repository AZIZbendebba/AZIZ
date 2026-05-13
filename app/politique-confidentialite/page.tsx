import type { Metadata } from 'next'
import GoldDivider from '@/components/shared/GoldDivider'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données — Solid Surface Tunisie.',
  robots: { index: false },
}

export default function PolitiqueConfidentialitePage() {
  return (
    <section className="pt-40 pb-24 bg-noir-profond min-h-screen">
      <div className="container-site max-w-3xl">
        <p className="overline-text mb-6">Légal</p>
        <h1 className="font-cormorant font-light text-blanc-pur text-5xl mb-8">
          Politique de confidentialité
        </h1>
        <GoldDivider className="mb-12" />

        <div className="space-y-10 font-inter font-light text-gris-texte text-sm leading-relaxed">
          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Responsable du traitement</h2>
            <p>
              Solid Surface Tunisie / Techno-Logika SA, Zone industrielle, Tunis, Tunisie.<br />
              Contact : contact@solid-surface-tunisie.com
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Données collectées</h2>
            <p className="mb-4">Nous collectons les données suivantes via notre formulaire de contact et de devis :</p>
            <ul className="space-y-2 pl-4">
              {['Nom et prénom', 'Adresse email', 'Numéro de téléphone', 'Ville', 'Informations relatives à votre projet'].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-or-champagne shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Finalité du traitement</h2>
            <p>
              Les données collectées sont utilisées exclusivement pour :
            </p>
            <ul className="space-y-2 pl-4 mt-4">
              {[
                'Répondre à votre demande de devis ou de contact',
                'Vous adresser une offre commerciale adaptée à votre projet',
                'Améliorer nos services et notre communication',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-1 h-1 bg-or-champagne shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Conservation des données</h2>
            <p>
              Vos données personnelles sont conservées pendant une durée maximale de 3 ans
              à compter de votre dernière interaction avec notre service. À l&apos;issue de
              cette période, elles sont supprimées de nos systèmes.
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Vos droits</h2>
            <p>
              Conformément aux lois applicables en matière de protection des données, vous
              disposez des droits suivants : accès, rectification, suppression, portabilité
              et opposition au traitement de vos données personnelles. Pour exercer ces droits,
              contactez-nous à l&apos;adresse : contact@solid-surface-tunisie.com.
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-cormorant font-light text-blanc-pur text-2xl mb-4">Cookies</h2>
            <p>
              Ce site n&apos;utilise pas de cookies de tracking tiers. Des cookies techniques
              strictement nécessaires au fonctionnement du site peuvent être utilisés.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
