import { createClient } from '@/lib/supabase/server'
import type { Devis, DevisLigne } from '@/lib/devis/types'
import BonLivraisonForm from '@/components/admin/bl/BonLivraisonForm'

type SearchParams = Promise<{ devis?: string; client?: string }>

export default async function NouveauBLPage({ searchParams }: { searchParams: SearchParams }) {
  const { devis: devisId, client: clientId } = await searchParams
  const supabase = await createClient()

  const [{ data: clients, error: clientsError }, { data: produits, error: produitsError }] = await Promise.all([
    supabase.from('clients').select('id, nom').order('nom'),
    supabase.from('produits').select('*').order('code'),
  ])
  if (clientsError) throw new Error(clientsError.message)
  if (produitsError) throw new Error(produitsError.message)

  let devisPrefill: {
    clientId: string
    entite: Devis['entite']
    lignes: { code: string | null; designation: string; unite: string; qte: number }[]
  } | null = null

  if (devisId) {
    const { data: devis, error: devisError } = await supabase
      .from('devis')
      .select('*')
      .eq('id', devisId)
      .maybeSingle()
    if (devisError) throw new Error(devisError.message)

    if (devis) {
      const { data: lignesDevis, error: lignesError } = await supabase
        .from('devis_lignes')
        .select('*')
        .eq('devis_id', devisId)
        .order('ordre')
      if (lignesError) throw new Error(lignesError.message)

      const d = devis as Devis
      devisPrefill = {
        clientId: d.client_id,
        entite: d.entite,
        lignes: (lignesDevis as DevisLigne[]).map((l) => ({
          code: l.code,
          designation: l.designation,
          unite: l.unite,
          qte: l.qte,
        })),
      }
    }
  }

  return (
    <div>
      <h1 className="mb-6 font-cormorant text-2xl">Nouveau bon de livraison</h1>
      <BonLivraisonForm
        clients={clients}
        produits={produits}
        devisId={devisId}
        clientIdPreselect={devisPrefill?.clientId ?? clientId}
        entitePreselect={devisPrefill?.entite}
        lignesPreselect={devisPrefill?.lignes}
      />
    </div>
  )
}
