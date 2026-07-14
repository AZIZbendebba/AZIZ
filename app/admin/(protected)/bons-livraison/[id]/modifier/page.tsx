import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { BonLivraison, BonLivraisonLigne } from '@/lib/bl/types'
import BonLivraisonForm from '@/components/admin/bl/BonLivraisonForm'

type Props = { params: Promise<{ id: string }> }

export default async function ModifierBLPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: clients, error: clientsError }, { data: produits, error: produitsError }] = await Promise.all([
    supabase.from('clients').select('id, nom').order('nom'),
    supabase.from('produits').select('*').order('code'),
  ])
  if (clientsError) throw new Error(clientsError.message)
  if (produitsError) throw new Error(produitsError.message)

  const { data: bl, error } = await supabase.from('bons_livraison').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  if (!bl) notFound()

  const { data: lignes, error: lignesError } = await supabase
    .from('bons_livraison_lignes')
    .select('*')
    .eq('bl_id', id)
    .order('ordre')
  if (lignesError) throw new Error(lignesError.message)

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Modifier le BL {(bl as BonLivraison).numero}</h1>
      <BonLivraisonForm
        clients={clients}
        produits={produits}
        bl={bl as BonLivraison}
        lignes={lignes as BonLivraisonLigne[]}
      />
    </div>
  )
}
