'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { Devis, DevisLigne } from '@/lib/devis/types'

export type DevisHeaderInput = {
  client_id: string
  numero: string
  entite: Devis['entite']
  regime_tva: Devis['regime_tva']
  matricule_fiscal: string | null
  mode_livraison: string | null
  delai_livraison: string | null
  mode_paiement: string | null
  validite: string | null
  statut: Devis['statut']
}

export type DevisLigneInput = {
  ordre: number
  section: string | null
  sous_groupe: string | null
  produit_id: string | null
  code: string | null
  unite: DevisLigne['unite']
  designation: string
  qte: number
  prix_unitaire_htva: number
  remise_pct: number | null
}

export async function creerDevis(
  header: DevisHeaderInput,
  lignes: DevisLigneInput[]
): Promise<{ id: string }> {
  const supabase = await createClient()

  const { data: devis, error } = await supabase.from('devis').insert(header).select('id').single()
  if (error) throw new Error(error.message)

  if (lignes.length > 0) {
    const { error: lignesError } = await supabase
      .from('devis_lignes')
      .insert(lignes.map((l) => ({ ...l, devis_id: devis.id })))
    if (lignesError) throw new Error(lignesError.message)
  }

  revalidatePath('/admin/devis')
  return { id: devis.id }
}

export async function modifierDevis(
  id: string,
  header: DevisHeaderInput,
  lignes: DevisLigneInput[]
): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.from('devis').update(header).eq('id', id)
  if (error) throw new Error(error.message)

  const { error: deleteError } = await supabase.from('devis_lignes').delete().eq('devis_id', id)
  if (deleteError) throw new Error(deleteError.message)

  if (lignes.length > 0) {
    const { error: insertError } = await supabase
      .from('devis_lignes')
      .insert(lignes.map((l) => ({ ...l, devis_id: id })))
    if (insertError) throw new Error(insertError.message)
  }

  revalidatePath('/admin/devis')
  revalidatePath(`/admin/devis/${id}`)
}

export async function changerStatutDevis(id: string, statut: Devis['statut']): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('devis').update({ statut }).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/devis')
  revalidatePath(`/admin/devis/${id}`)
}

export async function supprimerDevis(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('devis').delete().eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/devis')
}
