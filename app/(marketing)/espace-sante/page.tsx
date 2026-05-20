import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'En construction',
}

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-noir-profond">
      <p className="font-serif text-2xl text-or-champagne">Page en cours de construction</p>
    </section>
  )
}
