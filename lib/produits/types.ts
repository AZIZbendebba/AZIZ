import type { Entite, Unite } from '@/lib/devis/types'

export type Produit = {
  id: string
  entite: Entite
  code: string
  designation: string
  unite: Unite
  prix_unitaire_htva: number
  stock_actuel: number
  seuil_alerte: number
  cree_le: string
}

export type MouvementStock = {
  id: string
  produit_id: string
  bl_id: string | null
  quantite: number
  date: string
}
