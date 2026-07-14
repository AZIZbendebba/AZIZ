import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Produit } from '@/lib/produits/types'
import DeleteProduitButton from '@/components/admin/produits/DeleteProduitButton'
import { buttonSecondaryClass } from '@/lib/admin-ui'

type Props = { params: Promise<{ id: string }> }

type MouvementRow = {
  id: string
  quantite: number
  date: string
  bons_livraison: { numero: string } | null
}

export default async function ProduitDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: produit, error } = await supabase.from('produits').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  if (!produit) notFound()

  const { data: mouvements, error: mouvementsError } = await supabase
    .from('mouvements_stock')
    .select('id, quantite, date, bons_livraison(numero)')
    .eq('produit_id', id)
    .order('date', { ascending: false })
  if (mouvementsError) throw new Error(mouvementsError.message)

  const p = produit as Produit
  const stockBas = p.stock_actuel <= p.seuil_alerte
  const rows = mouvements as unknown as MouvementRow[]

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">
          {p.code} — {p.designation}
        </h1>
        <div className="flex gap-3">
          <Link href={`/admin/produits/${p.id}/modifier`} className={buttonSecondaryClass}>
            Modifier
          </Link>
          <DeleteProduitButton id={p.id} />
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-3 border border-white/10 p-6 text-sm md:grid-cols-2">
        <Info label="Entité" value={p.entite} />
        <Info label="Unité" value={p.unite} />
        <Info label="Prix unitaire HTVA" value={p.prix_unitaire_htva.toFixed(3)} />
        <div>
          <p className="text-gris-texte">Stock actuel</p>
          <p className={stockBas ? 'text-red-400' : ''}>
            {p.stock_actuel} {stockBas && '— stock bas ⚠'}
          </p>
        </div>
        <Info label="Seuil d'alerte" value={String(p.seuil_alerte)} />
      </div>

      <h2 className="mb-4 font-cormorant text-xl">Historique des mouvements de stock</h2>
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-gris-texte">
              <th className="p-3 font-normal">Date</th>
              <th className="p-3 font-normal">Bon de livraison</th>
              <th className="p-3 text-right font-normal">Quantité</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-b border-white/5">
                <td className="p-3 text-gris-texte">{new Date(m.date).toLocaleDateString('fr-FR')}</td>
                <td className="p-3">
                  {m.bons_livraison ? (
                    <span className="text-gris-texte">{m.bons_livraison.numero}</span>
                  ) : (
                    <span className="text-gris-texte">—</span>
                  )}
                </td>
                <td className={`p-3 text-right ${m.quantite < 0 ? 'text-red-400' : 'text-gris-texte'}`}>
                  {m.quantite > 0 ? `+${m.quantite}` : m.quantite}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gris-texte">
                  Aucun mouvement de stock pour ce produit.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gris-texte">{label}</p>
      <p>{value}</p>
    </div>
  )
}
