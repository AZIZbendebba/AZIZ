import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Produit } from '@/lib/produits/types'
import ProduitForm from '@/components/admin/produits/ProduitForm'

type Props = { params: Promise<{ id: string }> }

export default async function ModifierProduitPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: produit, error } = await supabase.from('produits').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  if (!produit) notFound()

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Modifier {(produit as Produit).code}</h1>
      <ProduitForm produit={produit as Produit} />
    </div>
  )
}
