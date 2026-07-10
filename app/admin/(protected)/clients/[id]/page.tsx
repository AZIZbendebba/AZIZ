import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Client, Devis } from '@/lib/devis/types'
import DeleteClientButton from '@/components/admin/clients/DeleteClientButton'
import { buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

type Props = { params: Promise<{ id: string }> }

const REGIME_LABEL: Record<string, string> = {
  Assujetti: 'Assujetti',
  'Non assujetti': 'Non assujetti',
  Exonere: 'Exonéré',
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!client) notFound()

  const { data: devis, error: devisError } = await supabase
    .from('devis')
    .select('*')
    .eq('client_id', id)
    .order('date', { ascending: false })

  if (devisError) throw new Error(devisError.message)

  const c = client as Client

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">{c.nom}</h1>
        <div className="flex gap-3">
          <Link href={`/admin/clients/${c.id}/modifier`} className={buttonSecondaryClass}>
            Modifier
          </Link>
          <DeleteClientButton id={c.id} />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 border border-white/10 p-6 text-sm md:grid-cols-2">
        <Info label="Code client" value={c.code_client} />
        <Info label="Statut" value={c.statut} />
        <Info label="Secteur" value={c.secteur} />
        <Info label="Régime TVA" value={REGIME_LABEL[c.regime_tva] ?? c.regime_tva} />
        <Info label="Téléphone" value={c.telephone} />
        <Info label="Email" value={c.email} />
        <Info label="Adresse" value={c.adresse} />
        <Info label="Matricule fiscal" value={c.matricule_fiscal} />
        {c.notes_crm && (
          <div className="md:col-span-2">
            <p className="text-gris-texte">Notes CRM</p>
            <p className="whitespace-pre-wrap">{c.notes_crm}</p>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-cormorant text-xl">Historique des devis</h2>
        <Link href={`/admin/devis/nouveau?client=${c.id}`} className={buttonPrimaryClass}>
          + Nouveau devis
        </Link>
      </div>

      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gris-texte">
              <th className="p-3 font-normal">Numéro</th>
              <th className="p-3 font-normal">Date</th>
              <th className="p-3 font-normal">Entité</th>
              <th className="p-3 font-normal">Statut</th>
            </tr>
          </thead>
          <tbody>
            {(devis as Devis[]).map((d) => (
              <tr key={d.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="p-3">
                  <Link href={`/admin/devis/${d.id}`} className="hover:text-or-champagne">
                    {d.numero}
                  </Link>
                </td>
                <td className="p-3 text-gris-texte">{d.date}</td>
                <td className="p-3 text-gris-texte">{d.entite}</td>
                <td className="p-3 text-gris-texte">{d.statut}</td>
              </tr>
            ))}
            {devis.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gris-texte">
                  Aucun devis pour ce client.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-gris-texte">{label}</p>
      <p>{value ?? '—'}</p>
    </div>
  )
}
