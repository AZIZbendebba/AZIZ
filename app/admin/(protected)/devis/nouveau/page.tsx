import { createClient } from '@/lib/supabase/server'
import DevisForm from '@/components/admin/devis/DevisForm'

type SearchParams = Promise<{ client?: string }>

export default async function NouveauDevisPage({ searchParams }: { searchParams: SearchParams }) {
  const { client } = await searchParams
  const supabase = await createClient()

  const { data: clients, error } = await supabase.from('clients').select('id, nom').order('nom')
  if (error) throw new Error(error.message)

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Nouveau devis</h1>
      <DevisForm clients={clients} clientIdPreselect={client} />
    </div>
  )
}
