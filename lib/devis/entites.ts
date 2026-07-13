import type { Entite } from './types'

// TODO(Promacryl) : le logo Techno-Logika (fichier image) n'est pas
// encore disponible dans le dépôt.
export const INFOS_ENTITE: Record<
  Entite,
  {
    logo: string | null
    // 'entete' : logo affiché en haut à gauche (comportement par défaut).
    // 'pied'   : pas de logo en en-tête (remplacé par enteteTexte), le
    //            logo est affiché centré en bas de page à la place.
    logoPosition: 'entete' | 'pied'
    enteteTexte?: string[]
    // Style du bloc mentions légales en pied de page.
    footerAlignement: 'gauche' | 'centre'
    footerTexteNoir?: boolean
    nomAffiche: string
    // null = pas de capital social communiqué : la ligne "au C.S de ..."
    // n'est alors pas affichée du tout (plutôt qu'un placeholder visible).
    capitalSocial: string | null
    adresse: string
    telephone: string
    email: string
    rc: string
    matriculeFiscal: string
    codeDouane: string
    identifiantUnique?: string
    rib?: string
    siteWeb?: string
  }
> = {
  'Solid Surface Tunisie': {
    logo: 'public/logo-noir.png',
    logoPosition: 'pied',
    enteteTexte: [
      'PROMACRYL',
      'Siège Social : avenue Fattouma Bourguiba - résidence Tej Ezzahra - Bureau 2.5',
      '2036 La Soukra - Tunis',
      'Tél : (+216) 99 635 309 - 98 401 512',
    ],
    footerAlignement: 'centre',
    footerTexteNoir: true,
    nomAffiche: 'Solid Surface Tunisie',
    capitalSocial: null,
    adresse: 'Avenue Fattouma Bourguiba, résidence Tej Ezzahra, bureau 2.5, 2036 La Soukra',
    telephone: '(+216) 99 635 309 - 98 401 512',
    email: 'admin@promacryl.tn / gestcom@promacryl.tn',
    rc: 'B033802021',
    matriculeFiscal: '1699861A A M 000',
    codeDouane: '1199861A',
    identifiantUnique: '1699861A',
    rib: '25 009 000 0000844022 11',
    siteWeb: 'https://www.solid-surface-tunisie.com/',
  },
  'Techno-Logika': {
    logo: 'public/logo-techno-logika.png',
    logoPosition: 'entete',
    footerAlignement: 'gauche',
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
