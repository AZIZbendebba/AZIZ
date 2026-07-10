import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/devis/types'
import ClientForm from '@/components/admin/clients/ClientForm'

type Props = { params: Promise<{ id: string }> }

export default async function ModifierClientPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!client) notFound()

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Modifier {(client as Client).nom}</h1>
      <ClientForm client={client as Client} />
    </div>
  )
}
