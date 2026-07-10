import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Devis, DevisLigne } from '@/lib/devis/types'
import DevisForm from '@/components/admin/devis/DevisForm'

type Props = { params: Promise<{ id: string }> }

export default async function ModifierDevisPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: clients, error: clientsError } = await supabase
    .from('clients')
    .select('id, nom')
    .order('nom')
  if (clientsError) throw new Error(clientsError.message)

  const { data: devis, error } = await supabase.from('devis').select('*').eq('id', id).maybeSingle()
  if (error) throw new Error(error.message)
  if (!devis) notFound()

  const { data: lignes, error: lignesError } = await supabase
    .from('devis_lignes')
    .select('*')
    .eq('devis_id', id)
    .order('ordre')
  if (lignesError) throw new Error(lignesError.message)

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Modifier le devis {(devis as Devis).numero}</h1>
      <DevisForm clients={clients} devis={devis as Devis} lignes={lignes as DevisLigne[]} />
    </div>
  )
}
