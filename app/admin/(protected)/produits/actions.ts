'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Entite, Unite } from '@/lib/devis/types'

export type ProduitInput = {
  entite: Entite
  code: string
  designation: string
  unite: Unite
  prix_unitaire_htva: number
  stock_actuel: number
  seuil_alerte: number
}

export async function creerProduit(input: ProduitInput): Promise<{ id: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('produits').insert(input).select('id').single()
  if (error) throw new Error(error.message)

  revalidatePath('/admin/produits')
  return { id: data.id }
}

export async function modifierProduit(id: string, input: ProduitInput): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('produits').update(input).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/produits')
  revalidatePath(`/admin/produits/${id}`)
}

export async function supprimerProduit(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('produits').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/produits')
}
