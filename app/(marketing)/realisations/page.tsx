import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos réalisations',
  description: "Découvrez nos 500 projets réalisés en Tunisie : cuisines, salles de bain, espaces santé et bureautiques en Solid Surface et Corian®.",
}

export default function RealisationsPage() {
  return (
    <section className="min-h-screen pt-32 bg-noir-profond">
      <div className="container-site">
        <h1 className="font-serif text-5xl text-blanc-pur mb-4">
          Nos <em className="text-or-champagne">réalisations</em>
        </h1>
        <p className="font-sans text-blanc-pur/70">Page en cours de construction.</p>
      </div>
    </section>
  )
}
