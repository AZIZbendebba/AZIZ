'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Entite } from '@/lib/devis/types'
import type { StatutBL } from '@/lib/bl/types'

export type BLHeaderInput = {
  numero: string
  client_id: string | null
  entite: Entite
  devis_id: string | null
  date_livraison: string
  destination: string | null
}

export type BLLigneInput = {
  ordre: number
  produit_id: string
  code: string | null
  unite: string
  designation: string
  qte_livree: number
}

export async function creerBL(header: BLHeaderInput, lignes: BLLigneInput[]): Promise<{ id: string }> {
  const supabase = await createClient()

  const { data: bl, error } = await supabase.from('bons_livraison').insert(header).select('id').single()
  if (error) throw new Error(error.message)

  if (lignes.length > 0) {
    const { error: lignesError } = await supabase
      .from('bons_livraison_lignes')
      .insert(lignes.map((l) => ({ ...l, bl_id: bl.id })))
    if (lignesError) throw new Error(lignesError.message)
  }

  revalidatePath('/admin/bons-livraison')
  return { id: bl.id }
}

export async function modifierBL(id: string, header: BLHeaderInput, lignes: BLLigneInput[]): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.from('bons_livraison').update(header).eq('id', id)
  if (error) throw new Error(error.message)

  const { error: deleteError } = await supabase.from('bons_livraison_lignes').delete().eq('bl_id', id)
  if (deleteError) throw new Error(deleteError.message)

  if (lignes.length > 0) {
    const { error: insertError } = await supabase
      .from('bons_livraison_lignes')
      .insert(lignes.map((l) => ({ ...l, bl_id: id })))
    if (insertError) throw new Error(insertError.message)
  }

  revalidatePath('/admin/bons-livraison')
  revalidatePath(`/admin/bons-livraison/${id}`)
}

export async function changerStatutBL(id: string, statut: StatutBL): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.rpc('changer_statut_bon_livraison', { p_bl_id: id, p_statut: statut })
  if (error) throw new Error(error.message)
  revalidatePath('/admin/bons-livraison')
  revalidatePath(`/admin/bons-livraison/${id}`)
  revalidatePath('/admin/produits')
}

export async function supprimerBL(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('bons_livraison').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/bons-livraison')
}
