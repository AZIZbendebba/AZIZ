import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: "15 ans d'expertise en surfaces Solid Surface et Corian® en Tunisie.",
}

export default function AProposPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-noir-profond">
      <p className="font-serif text-2xl text-or-champagne">Page en cours de construction</p>
    </section>
  )
}
