import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { SECTEURS_CLIENT, STATUTS_CLIENT, type Client } from '@/lib/devis/types'
import { inputClass, buttonPrimaryClass } from '@/lib/admin-ui'

type SearchParams = Promise<{ q?: string; secteur?: string; statut?: string }>

export default async function ClientsPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = '', secteur = '', statut = '' } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('clients').select('*').order('nom')
  if (q) query = query.or(`nom.ilike.%${q}%,code_client.ilike.%${q}%,email.ilike.%${q}%`)
  if (secteur) query = query.eq('secteur', secteur)
  if (statut) query = query.eq('statut', statut)

  const { data: clients, error } = await query
  if (error) throw new Error(error.message)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Clients</h1>
        <Link href="/admin/clients/nouveau" className={buttonPrimaryClass}>
          + Nouveau client
        </Link>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Rechercher (nom, code, email)…"
          className={`${inputClass} max-w-xs`}
        />
        <select name="secteur" defaultValue={secteur} className={inputClass}>
          <option value="">Tous les secteurs</option>
          {SECTEURS_CLIENT.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select name="statut" defaultValue={statut} className={inputClass}>
          <option value="">Tous les statuts</option>
          {STATUTS_CLIENT.map((s) => (
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
              <th className="p-3 font-normal">Nom</th>
              <th className="p-3 font-normal">Secteur</th>
              <th className="p-3 font-normal">Statut</th>
              <th className="p-3 font-normal">Téléphone</th>
              <th className="p-3 font-normal">Email</th>
            </tr>
          </thead>
          <tbody>
            {(clients as Client[]).map((client) => (
              <tr key={client.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <Link href={`/admin/clients/${client.id}`} className="hover:text-or-champagne">
                    {client.nom}
                  </Link>
                </td>
                <td className="p-3 text-gris-texte">{client.secteur ?? '—'}</td>
                <td className="p-3 text-gris-texte">{client.statut}</td>
                <td className="p-3 text-gris-texte">{client.telephone ?? '—'}</td>
                <td className="p-3 text-gris-texte">{client.email ?? '—'}</td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gris-texte">
                  Aucun client trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
