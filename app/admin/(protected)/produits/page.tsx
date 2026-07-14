import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ENTITES } from '@/lib/devis/types'
import type { Produit } from '@/lib/produits/types'
import { inputClass, buttonPrimaryClass } from '@/lib/admin-ui'

type SearchParams = Promise<{ q?: string; entite?: string }>

export default async function ProduitsPage({ searchParams }: { searchParams: SearchParams }) {
  const { q = '', entite = '' } = await searchParams
  const supabase = await createClient()

  let query = supabase.from('produits').select('*').order('code')
  if (q) query = query.or(`code.ilike.%${q}%,designation.ilike.%${q}%`)
  if (entite) query = query.eq('entite', entite)

  const { data: produits, error } = await query
  if (error) throw new Error(error.message)

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-cormorant text-2xl">Produits</h1>
        <Link href="/admin/produits/nouveau" className={buttonPrimaryClass}>
          + Nouveau produit
        </Link>
      </div>

      <form className="mb-6 flex flex-wrap gap-3" method="get">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Rechercher (code, désignation)…"
          className={`${inputClass} max-w-xs`}
        />
        <select name="entite" defaultValue={entite} className={inputClass}>
          <option value="">Toutes les entités</option>
          {ENTITES.map((e) => (
            <option key={e} value={e}>
              {e}
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
              <th className="p-3 font-normal">Code</th>
              <th className="p-3 font-normal">Désignation</th>
              <th className="p-3 font-normal">Entité</th>
              <th className="p-3 font-normal">Unité</th>
              <th className="p-3 text-right font-normal">Prix HTVA</th>
              <th className="p-3 text-right font-normal">Stock</th>
            </tr>
          </thead>
          <tbody>
            {(produits as Produit[]).map((p) => {
              const stockBas = p.stock_actuel <= p.seuil_alerte
              return (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">
                    <Link href={`/admin/produits/${p.id}`} className="hover:text-or-champagne">
                      {p.code}
                    </Link>
                  </td>
                  <td className="p-3 text-gris-texte">{p.designation}</td>
                  <td className="p-3 text-gris-texte">{p.entite}</td>
                  <td className="p-3 text-gris-texte">{p.unite}</td>
                  <td className="p-3 text-right text-gris-texte">{p.prix_unitaire_htva.toFixed(3)}</td>
                  <td className={`p-3 text-right ${stockBas ? 'text-red-400' : 'text-gris-texte'}`}>
                    {p.stock_actuel}
                    {stockBas && ' ⚠'}
                  </td>
                </tr>
              )
            })}
            {produits.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gris-texte">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
