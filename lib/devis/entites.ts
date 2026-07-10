import type { Entite } from './types'

// TODO(Promacryl) : les coordonnées légales de Solid Surface Tunisie
// (RC, matricule fiscal, code douane, capital social, adresse, téléphone)
// restent en placeholder "À compléter" — pas fournies dans le cahier des
// charges. Celles de Techno-Logika viennent du bon de livraison n°23 du
// 24/06/2026 (document réel partagé). Le logo Techno-Logika (fichier
// image) n'est pas encore disponible dans le dépôt.
export const INFOS_ENTITE: Record<
  Entite,
  {
    logo: string | null
    nomAffiche: string
    capitalSocial: string
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
    capitalSocial: 'À compléter',
    adresse: 'À compléter',
    telephone: 'À compléter',
    email: 'À compléter',
    rc: 'À compléter',
    matriculeFiscal: 'À compléter',
    codeDouane: 'À compléter',
  },
  'Techno-Logika': {
    logo: 'public/logo-techno-logika.png',
    nomAffiche: 'Techno-Logika SA',
    capitalSocial: '1.600.000 DT',
    adresse: 'Résidence Tej Ezzahra, bureau 2.3, avenue Fattouma Bourguiba, 2036 La Soukra',
    telephone: '(+216) 28 725645 - 99 635309',
    email: 'commercial@techno-logika.com / admin@techno-logika.com',
    rc: 'B2427852006',
    matriculeFiscal: '961537B A M 000',
    codeDouane: '822087K',
  },
}
