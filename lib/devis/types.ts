export type RegimeTva = 'Assujetti' | 'Non assujetti' | 'Exonere'
export type Entite = 'Solid Surface Tunisie' | 'Techno-Logika'
export type Unite = 'PC' | 'ML' | 'KIT' | 'UNITE' | 'LOT'
export type SecteurClient = 'Résidentiel' | 'Hôtellerie' | 'Santé' | 'Commercial' | 'Institutionnel'
export type StatutClient = 'Prospect' | 'Client'
export type StatutDevis = 'Brouillon' | 'Envoyé' | 'Accepté' | 'Refusé'

export const REGIMES_TVA: RegimeTva[] = ['Assujetti', 'Non assujetti', 'Exonere']
export const ENTITES: Entite[] = ['Solid Surface Tunisie', 'Techno-Logika']
export const UNITES: Unite[] = ['PC', 'ML', 'KIT', 'UNITE', 'LOT']
export const SECTEURS_CLIENT: SecteurClient[] = [
  'Résidentiel',
  'Hôtellerie',
  'Santé',
  'Commercial',
  'Institutionnel',
]
export const STATUTS_CLIENT: StatutClient[] = ['Prospect', 'Client']
export const STATUTS_DEVIS: StatutDevis[] = ['Brouillon', 'Envoyé', 'Accepté', 'Refusé']

export type Client = {
  id: string
  code_client: string | null
  nom: string
  adresse: string | null
  telephone: string | null
  email: string | null
  regime_tva: RegimeTva
  matricule_fiscal: string | null
  notes_crm: string | null
  secteur: SecteurClient | null
  statut: StatutClient
  cree_le: string
}

export type Devis = {
  id: string
  numero: string
  client_id: string
  entite: Entite
  regime_tva: RegimeTva
  matricule_fiscal: string | null
  mode_livraison: string | null
  delai_livraison: string | null
  mode_paiement: string | null
  validite: string | null
  statut: StatutDevis
  date: string
  cree_le: string
}

export type DevisLigne = {
  id: string
  devis_id: string
  ordre: number
  section: string | null
  sous_groupe: string | null
  produit_id: string | null
  code: string | null
  unite: Unite
  designation: string
  qte: number
  prix_unitaire_htva: number
  remise_pct: number | null
}

// Ligne encore en cours d'édition côté formulaire (avant sauvegarde en base).
export type DevisLigneInput = Omit<DevisLigne, 'id' | 'devis_id'> & { id?: string }
