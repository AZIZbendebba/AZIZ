import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { BonLivraison } from '@/lib/bl/types'
import StatutBLSelect from '@/components/admin/bl/StatutBLSelect'
import DeleteBLButton from '@/components/admin/bl/DeleteBLButton'
import { buttonPrimaryClass, buttonSecondaryClass } from '@/lib/admin-ui'

type Props = { params: Promise<{ id: string }> }

type LigneRow = {
  id: string
  code: string | null
  unite: string
  designation: string
  qte_livree: number
  produits: { stock_actuel: number; seuil_alerte: number } | null
}

export default async function BonLivraisonDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: blRow, error } = await supabase
    .from('bons_livraison')
    .select('*, clients(nom), devis(numero)')
    .eq('id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  if (!blRow) notFound()

  const bl = blRow as BonLivraison & { clients: { nom: string } | null; devis: { numero: string } | null }

  const { data: lignesData, error: lignesError } = await supabase
    .from('bons_livraison_lignes')
    .select('id, code, unite, designation, qte_livree, produits(stock_actuel, seuil_alerte)')
    .eq('bl_id', id)
    .order('ordre')
  if (lignesError) throw new Error(lignesError.message)

  const lignes = lignesData as unknown as LigneRow[]

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Bon de livraison {bl.numero}</h1>
        <div className="flex gap-3">
          <a href={`/api/bons-livraison/${bl.id}/pdf`} className={buttonPrimaryClass}>
            Télécharger PDF
          </a>
          {bl.statut === 'Brouillon' && (
            <Link href={`/admin/bons-livraison/${bl.id}/modifier`} className={buttonSecondaryClass}>
              Modifier
            </Link>
          )}
          <DeleteBLButton id={bl.id} stockDeduit={bl.stock_deduit} />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 border border-white/10 p-6 text-sm md:grid-cols-2">
        <Info label="Client" value={bl.clients?.nom ?? 'Transfert interne'} />
        <Info label="Destination / référence" value={bl.destination} />
        <Info label="Entité" value={bl.entite} />
        <Info label="Date de livraison" value={bl.date_livraison} />
        <Info label="Devis d'origine" value={bl.devis?.numero ?? null} />
        <div>
          <p className="mb-1 text-gris-texte">Statut</p>
          <StatutBLSelect id={bl.id} statut={bl.statut} />
        </div>
      </div>

      {bl.stock_deduit && (
        <p className="mb-4 text-xs text-gris-texte">
          Le stock a déjà été déduit pour ce bon de livraison ({bl.statut}).
        </p>
      )}

      <div className="mb-4 overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gris-texte">
              <th className="p-3 font-normal">Code</th>
              <th className="p-3 font-normal">Unité</th>
              <th className="p-3 font-normal">Désignation</th>
              <th className="p-3 text-right font-normal">Qté livrée</th>
              <th className="p-3 text-right font-normal">Stock restant</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l) => {
              const stockNegatif = l.produits != null && l.produits.stock_actuel < 0
              const stockBas = l.produits != null && l.produits.stock_actuel <= l.produits.seuil_alerte
              return (
                <tr key={l.id} className="border-b border-white/5">
                  <td className="p-3 text-gris-texte">{l.code ?? '—'}</td>
                  <td className="p-3 text-gris-texte">{l.unite}</td>
                  <td className="p-3">{l.designation}</td>
                  <td className="p-3 text-right text-gris-texte">{l.qte_livree}</td>
                  <td className={`p-3 text-right ${stockNegatif ? 'text-red-400' : stockBas ? 'text-red-400/70' : 'text-gris-texte'}`}>
                    {l.produits?.stock_actuel ?? '—'}
                    {stockNegatif && ' ⚠ stock négatif'}
                  </td>
                </tr>
              )
            })}
            {lignes.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gris-texte">
                  Aucune ligne.
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
