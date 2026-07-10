import type { Entite } from './types'

// TODO(Promacryl) : remplacer les valeurs "À compléter" par les vraies
// coordonnées légales de chaque entité (RC, matricule fiscal de la société,
// code en douane, adresse, téléphone) avant mise en production — elles ne
// figuraient pas dans le cahier des charges fourni.
export const INFOS_ENTITE: Record<
  Entite,
  {
    logo: string | null
    nomAffiche: string
    adresse: string
    telephone: string
    email: string
    rc: string
    matriculeFiscal: string
    codeDouane: string
  }
> = {
  'Solid Surface Tunisie': {
    logo: 'public/logo-noir.png',
    nomAffiche: 'Solid Surface Tunisie',
    adresse: 'À compléter',
    telephone: 'À compléter',
    email: 'À compléter',
    rc: 'À compléter',
    matriculeFiscal: 'À compléter',
    codeDouane: 'À compléter',
  },
  'Techno-Logika': {
    logo: null,
    nomAffiche: 'Techno-Logika SA',
    adresse: 'À compléter',
    telephone: 'À compléter',
    email: 'À compléter',
    rc: 'À compléter',
    matriculeFiscal: 'À compléter',
    codeDouane: 'À compléter',
  },
}
