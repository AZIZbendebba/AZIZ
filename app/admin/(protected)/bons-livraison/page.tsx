import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { STATUTS_BL } from '@/lib/bl/types'
import { inputClass, buttonPrimaryClass } from '@/lib/admin-ui'

type SearchParams = Promise<{ client?: string; statut?: string; devis?: string }>

type BLRow = {
  id: string
  numero: string
  entite: string
  statut: string
  date_livraison: string
  clients: { nom: string } | null
  devis: { numero: string } | null
}

export default async function BonsLivraisonListPage({ searchParams }: { searchParams: SearchParams }) {
  const { client = '', statut = '', devis = '' } = await searchParams
  const supabase = await createClient()

  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .select('id, nom')
    .order('nom')
  if (clientsError) throw new Error(clientsError.message)

  const { data: devisListe, error: devisError } = await supabase
    .from('devis')
    .select('id, numero')
    .order('date', { ascending: false })
  if (devisError) throw new Error(devisError.message)

  let query = supabase
    .from('bons_livraison')
    .select('id, numero, entite, statut, date_livraison, clients(nom), devis(numero)')
    .order('date_livraison', { ascending: false })
  if (client) query = query.eq('client_id', client)
  if (statut) query = query.eq('statut', statut)
  if (devis) query = query.eq('devis_id', devis)

  const { data: bl, error } = await query
  if (error) throw new Error(error.message)

  const rows = bl as unknown as BLRow[]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Bons de livraison</h1>
        <Link href="/admin/bons-livraison/nouveau" className={buttonPrimaryClass}>
          + Nouveau BL
        </Link>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <select name="client" defaultValue={client} className={inputClass}>
          <option value="">Tous les clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
        <select name="statut" defaultValue={statut} className={inputClass}>
          <option value="">Tous les statuts</option>
          {STATUTS_BL.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select name="devis" defaultValue={devis} className={inputClass}>
          <option value="">Tous les devis d&apos;origine</option>
          {devisListe.map((d) => (
            <option key={d.id} value={d.id}>
              {d.numero}
            </option>
          ))}
        </select>
        <button type="submit" className={buttonPrimaryClass}>
          Filtrer
        </button>
      </form>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gris-texte">
              <th className="p-3 font-normal">Numéro</th>
              <th className="p-3 font-normal">Client / Destination</th>
              <th className="p-3 font-normal">Devis d&apos;origine</th>
              <th className="p-3 font-normal">Entité</th>
              <th className="p-3 font-normal">Date</th>
              <th className="p-3 font-normal">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((b) => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <Link href={`/admin/bons-livraison/${b.id}`} className="hover:text-or-champagne">
                    {b.numero}
                  </Link>
                </td>
                <td className="p-3 text-gris-texte">{b.clients?.nom ?? '—'}</td>
                <td className="p-3 text-gris-texte">{b.devis?.numero ?? '—'}</td>
                <td className="p-3 text-gris-texte">{b.entite}</td>
                <td className="p-3 text-gris-texte">{b.date_livraison}</td>
                <td className="p-3 text-gris-texte">{b.statut}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gris-texte">
                  Aucun bon de livraison trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
