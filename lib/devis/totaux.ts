import type { DevisLigneInput } from './types'

const TAUX_FODEC = 0.01
const TAUX_TVA = 0.19
const TIMBRE_FISCAL = 1

export function round3(n: number): number {
  return Math.round((n + Number.EPSILON) * 1000) / 1000
}

export function prixUnitaireNet(prixHtva: number, remisePct: number | null | undefined): number {
  if (remisePct == null || remisePct === 0) return prixHtva
  return prixHtva * (1 - remisePct / 100)
}

export function prixTotalNet(ligne: Pick<DevisLigneInput, 'prix_unitaire_htva' | 'remise_pct' | 'qte'>): number {
  return round3(prixUnitaireNet(ligne.prix_unitaire_htva, ligne.remise_pct) * ligne.qte)
}

export type Totaux = {
  totalHtva: number
  fodec: number
  tva: number
  timbre: number
  totalTtc: number
}

export function calculerTotaux(lignes: Pick<DevisLigneInput, 'prix_unitaire_htva' | 'remise_pct' | 'qte'>[]): Totaux {
  const totalHtva = round3(lignes.reduce((somme, ligne) => somme + prixTotalNet(ligne), 0))
  const fodec = round3(totalHtva * TAUX_FODEC)
  const tva = round3((totalHtva + fodec) * TAUX_TVA)
  const timbre = TIMBRE_FISCAL
  const totalTtc = round3(totalHtva + fodec + tva + timbre)
  return { totalHtva, fodec, tva, timbre, totalTtc }
}
