import type { Entite, Unite } from '@/lib/devis/types'

export type StatutBL = 'Brouillon' | 'Validé' | 'Livré'
export const STATUTS_BL: StatutBL[] = ['Brouillon', 'Validé', 'Livré']

export type BonLivraison = {
  id: string
  numero: string
  client_id: string | null
  entite: Entite
  devis_id: string | null
  date_livraison: string
  destination: string | null
  statut: StatutBL
  stock_deduit: boolean
  cree_le: string
}

export type BonLivraisonLigne = {
  id: string
  bl_id: string
  ordre: number
  produit_id: string
  code: string | null
  unite: Unite
  designation: string
  qte_livree: number
}
