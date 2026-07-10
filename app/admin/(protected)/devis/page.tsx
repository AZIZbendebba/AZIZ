import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { STATUTS_DEVIS } from '@/lib/devis/types'
import { inputClass, buttonPrimaryClass } from '@/lib/admin-ui'

type SearchParams = Promise<{ client?: string; statut?: string }>

type DevisRow = {
  id: string
  numero: string
  entite: string
  statut: string
  date: string
  clients: { nom: string } | null
}

export default async function DevisListPage({ searchParams }: { searchParams: SearchParams }) {
  const { client = '', statut = '' } = await searchParams
  const supabase = await createClient()

  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .select('id, nom')
    .order('nom')
  if (clientsError) throw new Error(clientsError.message)

  let query = supabase
    .from('devis')
    .select('id, numero, entite, statut, date, clients(nom)')
    .order('date', { ascending: false })
  if (client) query = query.eq('client_id', client)
  if (statut) query = query.eq('statut', statut)

  const { data: devis, error } = await query
  if (error) throw new Error(error.message)

  const rows = devis as unknown as DevisRow[]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Devis</h1>
        <Link href="/admin/devis/nouveau" className={buttonPrimaryClass}>
          + Nouveau devis
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
          {STATUTS_DEVIS.map((s) => (
            <option key={s} value={s}>
              {s}
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
              <th className="p-3 font-normal">Client</th>
              <th className="p-3 font-normal">Entité</th>
              <th className="p-3 font-normal">Date</th>
              <th className="p-3 font-normal">Statut</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <Link href={`/admin/devis/${d.id}`} className="hover:text-or-champagne">
                    {d.numero}
                  </Link>
                </td>
                <td className="p-3 text-gris-texte">{d.clients?.nom ?? '—'}</td>
                <td className="p-3 text-gris-texte">{d.entite}</td>
                <td className="p-3 text-gris-texte">{d.date}</td>
                <td className="p-3 text-gris-texte">{d.statut}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gris-texte">
                  Aucun devis trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
