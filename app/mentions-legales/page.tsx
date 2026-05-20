import type { Metadata } from 'next'
import GoldDivider from '@/components/shared/GoldDivider'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Solid Surface Tunisie , Solid Surface Tunisie.',
  robots: { index: false },
}

export default function MentionsLegalesPage() {
  return (
    <section className="pt-40 pb-24 bg-noir-profond min-h-screen">
      <div className="container-site max-w-3xl">
        <p className="overline-text mb-6">Légal</p>
        <h1 className="font-serif font-light text-blanc-pur text-5xl mb-8">Mentions légales</h1>
        <GoldDivider className="mb-12" />

        <div className="space-y-10 font-sans font-light text-blanc-pur/60 text-sm leading-relaxed">
          <div>
            <h2 className="font-serif font-light text-blanc-pur text-2xl mb-4">Éditeur du site</h2>
            <p>
              <strong className="font-medium text-blanc-pur/80">Solid Surface Tunisie</strong> , entité commerciale du groupe Solid Surface Tunisie<br />
              Société Anonyme au capital de [capital] TND<br />
              Siège social : Zone industrielle, Tunis, Tunisie<br />
              Matricule fiscal : [MF]<br />
              Registre du commerce : [RC]<br />
              Téléphone : +216 71 000 000<br />
              Email : contact@solid-surface-tunisie.com
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-serif font-light text-blanc-pur text-2xl mb-4">Hébergement</h2>
            <p>
              Ce site est hébergé par [Hébergeur], [Adresse], [Pays].<br />
              Téléphone : [Téléphone hébergeur]
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-serif font-light text-blanc-pur text-2xl mb-4">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, images, logos, photographies)
              est la propriété exclusive de Solid Surface Tunisie et est protégé
              par les lois tunisiennes et internationales relatives à la propriété intellectuelle.
              Toute reproduction, même partielle, est strictement interdite sans autorisation préalable.
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-serif font-light text-blanc-pur text-2xl mb-4">Responsabilité</h2>
            <p>
              Solid Surface Tunisie s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour
              des informations publiées sur ce site. Toutefois, des inexactitudes ou omissions peuvent
              survenir. La société ne saurait être tenue responsable des dommages directs ou indirects
              liés à l&apos;utilisation de ce site.
            </p>
          </div>

          <GoldDivider />

          <div>
            <h2 className="font-serif font-light text-blanc-pur text-2xl mb-4">Liens hypertextes</h2>
            <p>
              Ce site peut contenir des liens vers des sites tiers. Solid Surface Tunisie n&apos;exerce
              aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
