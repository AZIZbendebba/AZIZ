'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { RegimeTva, SecteurClient, StatutClient } from '@/lib/devis/types'

export type ClientInput = {
  nom: string
  code_client: string | null
  adresse: string | null
  telephone: string | null
  email: string | null
  regime_tva: RegimeTva
  matricule_fiscal: string | null
  secteur: SecteurClient | null
  statut: StatutClient
  notes_crm: string | null
}

export async function creerClient(input: ClientInput): Promise<{ id: string }> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('clients').insert(input).select('id').single()
  if (error) throw new Error(error.message)

  revalidatePath('/admin/clients')
  return { id: data.id }
}

export async function modifierClient(id: string, input: ClientInput): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('clients').update(input).eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/clients')
  revalidatePath(`/admin/clients/${id}`)
}

export async function supprimerClient(id: string): Promise<void> {
  const supabase = await createClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) throw new Error(error.message)

  revalidatePath('/admin/clients')
}
