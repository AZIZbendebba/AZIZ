export type Realisation = {
  slug: string
  titre: string
  secteur: string
  secteurSlug: string
  typologie: string
  lieu: string
  annee: string
  surface: string
  description: string
  defi: string
  solution: string
  materiaux: string[]
  architecte?: string
  images: string[]
  imageHero: string
  featured: boolean
}

export const realisations: Realisation[] = [
  {
    slug: 'villa-sidi-bou-said',
    titre: 'Villa Sidi Bou Saïd',
    secteur: 'Résidentiel',
    secteurSlug: 'residentiel',
    typologie: 'Cuisine',
    lieu: 'Sidi Bou Saïd, Tunisie',
    annee: '2023',
    surface: '28 m²',
    description: 'Une cuisine ouverte sur la Méditerranée, où la surface Corian blanc veiné dialogue avec le bleu azur de la mer.',
    defi: 'Créer un plan de travail monolithique de 4,80 m sans joint apparent, intégrant évier et plaque à induction dans une continuité parfaite.',
    solution: 'Thermoformage Corian Calacatta Nuvo — raccords invisibles réalisés en atelier, joints comblés à la résine de même teinte et polis.',
    materiaux: ['Corian® Calacatta Nuvo', 'Acier inoxydable brossé', 'Placage noyer naturel'],
    architecte: 'Studio Elyes Bejaoui',
    images: ['/images/cuisine-blanc-vene.jpg', '/images/plan-travail-beige.jpg'],
    imageHero: '/images/cuisine-blanc-vene.jpg',
    featured: true,
  },
  {
    slug: 'kitchen-ilot-lac',
    titre: 'Résidence Les Berges du Lac',
    secteur: 'Résidentiel',
    secteurSlug: 'residentiel',
    typologie: 'Cuisine',
    lieu: 'Les Berges du Lac II, Tunis',
    annee: '2023',
    surface: '35 m²',
    description: 'Un îlot central en Corian noir mat, massif et sculptural, au cœur d\'une cuisine de 35 m² aux volumes épurés.',
    defi: 'Intégrer un îlot de 3 m × 1,20 m avec face avant verticale en Solid Surface, résistant aux chocs d\'un usage quotidien intense.',
    solution: 'Structure portante en acier, habillage Corian Deep Nocturne d\'un seul tenant. Angles intérieurs thermoformés pour éviter toute reprise.',
    materiaux: ['Corian® Deep Nocturne', 'Structure acier peint', 'Laque bi-composant'],
    images: ['/images/cuisine-ilot.jpg', '/images/cuisine-hachicha.jpg'],
    imageHero: '/images/cuisine-ilot.jpg',
    featured: true,
  },
  {
    slug: 'cuisine-hachicha',
    titre: 'Maison Hachicha',
    secteur: 'Résidentiel',
    secteurSlug: 'residentiel',
    typologie: 'Cuisine & Mobilier',
    lieu: 'La Marsa, Tunisie',
    annee: '2022',
    surface: '42 m²',
    description: 'Alliance du bois de noyer naturel et du Corian brun fumé — une cuisine qui évoque l\'artisanat de luxe contemporain.',
    defi: 'Marier deux matières aux dilatations thermiques différentes dans un ensemble monobloc, sans fissure ni décollement dans le temps.',
    solution: 'Jonctions calculées avec joints de dilatation masqués. Placages noyer traités par un menuisier partenaire, plans de travail en Corian réalisés en atelier puis assemblés sur site.',
    materiaux: ['Corian® Clam Shell', 'Noyer naturel huilé', 'Quincaillerie Blum'],
    architecte: 'Hachicha & Associés',
    images: ['/images/cuisine-hachicha.jpg', '/images/corian-detail.jpg'],
    imageHero: '/images/cuisine-hachicha.jpg',
    featured: true,
  },
  {
    slug: 'clinique-carthage',
    titre: 'Clinique Carthage Medical',
    secteur: 'Healthcare',
    secteurSlug: 'healthcare',
    typologie: 'Plans de travail médicaux',
    lieu: 'Carthage, Tunis',
    annee: '2023',
    surface: '180 m²',
    description: 'Équipement complet de 14 salles de soins en Solid Surface blanc clinique — antibactérien, sans pore, sans joint.',
    defi: 'Livraison et installation phassée sur 6 semaines sans interrompre l\'activité de la clinique.',
    solution: 'Planification par tranches de 2 salles, préfabrication totale en atelier, pose nocturne. Délai tenu sans incident.',
    materiaux: ['Corian® Glacier White', 'Corian® Bone'],
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    ],
    imageHero: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    featured: false,
  },
  {
    slug: 'hotel-diar-el-medina',
    titre: 'Hôtel Diar El Médina',
    secteur: 'Hôtellerie',
    secteurSlug: 'hotellerie',
    typologie: 'Salles de bain',
    lieu: 'Médina de Tunis',
    annee: '2022',
    surface: '320 m²',
    description: 'Réhabilitation de 32 salles de bain d\'un boutique-hôtel historique — vasques et plans intégrés en Corian blanc ivoire.',
    defi: 'Travailler dans les contraintes dimensionnelles d\'un bâtiment du XIXe siècle, avec des murs jamais parallèles.',
    solution: 'Relevé 3D de chaque salle de bain. Découpe numérique sur mesure. Aucune pièce identique à une autre.',
    materiaux: ['Corian® Cameo White', 'Robinetterie laiton brossé'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    ],
    imageHero: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    featured: true,
  },
  {
    slug: 'bureau-direction-sfax',
    titre: 'Siège Social — Groupe Sotuver',
    secteur: 'Espaces de travail',
    secteurSlug: 'tertiaire',
    typologie: 'Mobilier de direction',
    lieu: 'Sfax, Tunisie',
    annee: '2024',
    surface: '95 m²',
    description: 'Mobilier de direction complet — bureau monolithique, bibliothèque intégrée et meuble TV en Solid Surface gris anthracite mat.',
    defi: 'Un bureau de PDG qui incarne la solidité du groupe sans ostentation — sobre, massif, durable.',
    solution: 'Bureau en Corian Cocoa Brown d\'un seul tenant, 3,20 m × 0,90 m. Bibliothèque en Corian Dove blanc sur structure acier inox.',
    materiaux: ['Corian® Cocoa Brown', 'Corian® Dove', 'Acier inoxydable mat'],
    images: ['/images/cuisine-grise.jpg'],
    imageHero: '/images/cuisine-grise.jpg',
    featured: false,
  },
]

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug)
}

export function getRealisationsBySecteur(secteurSlug: string): Realisation[] {
  return realisations.filter((r) => r.secteurSlug === secteurSlug)
}

export const typologies = ['Cuisine', 'Salle de bain', 'Mobilier', 'Plans de travail', 'Accueil', 'Espaces de travail']
