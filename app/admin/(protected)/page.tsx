import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = createClient()

  const [{ count: clientsCount }, { count: produitsCount }] = await Promise.all([
    supabase.from('clients').select('*', { count: 'exact', head: true }),
    supabase.from('produits').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div>
      <h1 className="mb-2 font-cormorant text-2xl">Fondations en place</h1>
      <p className="mb-6 text-gris-texte">
        Base de données connectée, authentification active. Les modules Devis, Bons de
        livraison, Factures et Avoirs seront ajoutés aux étapes suivantes.
      </p>
      <div className="grid max-w-md grid-cols-2 gap-4">
        <div className="border border-white/10 p-4">
          <p className="font-cormorant text-3xl">{clientsCount ?? 0}</p>
          <p className="text-sm text-gris-texte">Clients</p>
        </div>
        <div className="border border-white/10 p-4">
          <p className="font-cormorant text-3xl">{produitsCount ?? 0}</p>
          <p className="text-sm text-gris-texte">Produits</p>
        </div>
      </div>
    </div>
  )
}
