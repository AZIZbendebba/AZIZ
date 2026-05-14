export type Realisation = {
  slug: string
  titre: string
  univers: string
  universSlug: string
  secteur: string
  lieu: string
  annee: string
  description: string
  materiaux: string[]
  images: string[]
  imageHero: string
  featured: boolean
}

export const realisations: Realisation[] = [
  {
    slug: 'cuisine-hachicha',
    titre: 'Pâtisseries Hachicha',
    univers: 'Bureautique',
    universSlug: 'bureautique',
    secteur: 'Commercial',
    lieu: 'Tunis',
    annee: '2023',
    description: 'Comptoirs et surfaces de travail sur mesure en Solid Surface pour un espace pâtisserie exigeant en termes d\'hygiène et d\'esthétique.',
    materiaux: ['Corian® Glacier White', 'Corian® Bisque'],
    images: ['/images/cuisine-hachicha.jpg'],
    imageHero: '/images/cuisine-hachicha.jpg',
    featured: true,
  },
  {
    slug: 'cuisine-ilot-lac',
    titre: 'Cuisine îlot — Le Lac 2',
    univers: 'Cuisine',
    universSlug: 'cuisine',
    secteur: 'Résidentiel',
    lieu: 'Les Berges du Lac II, Tunis',
    annee: '2023',
    description: 'Un îlot central en Solid Surface noir mat, massif et sculptural, au cœur d\'une cuisine aux volumes épurés.',
    materiaux: ['Corian® Deep Nocturne', 'Laque bi-composant'],
    images: ['/images/cuisine-ilot.jpg'],
    imageHero: '/images/cuisine-ilot.jpg',
    featured: true,
  },
  {
    slug: 'plan-travail-blanc-veine',
    titre: 'Plan de travail veiné',
    univers: 'Cuisine',
    universSlug: 'cuisine',
    secteur: 'Résidentiel',
    lieu: 'Tunis',
    annee: '2023',
    description: 'Plan de travail monolithique en Solid Surface blanc veiné — raccords invisibles, continuité parfaite sur plusieurs mètres.',
    materiaux: ['Corian® Calacatta Nuvo'],
    images: ['/images/cuisine-blanc-vene.jpg'],
    imageHero: '/images/cuisine-blanc-vene.jpg',
    featured: true,
  },
  {
    slug: 'plan-travail-beige',
    titre: 'Plan de toilette & vasque',
    univers: 'Salle de Bain',
    universSlug: 'salle-de-bain',
    secteur: 'Résidentiel',
    lieu: 'Tunis',
    annee: '2022',
    description: 'Plan de toilette avec vasque intégrée sans joint, finition satinée en Solid Surface beige chaud.',
    materiaux: ['Corian® Linen', 'Robinetterie laiton brossé'],
    images: ['/images/plan-travail-beige.jpg'],
    imageHero: '/images/plan-travail-beige.jpg',
    featured: false,
  },
  {
    slug: 'cuisine-grise-direction',
    titre: 'Bureau de direction',
    univers: 'Bureautique',
    universSlug: 'bureautique',
    secteur: 'Tertiaire',
    lieu: 'Tunis',
    annee: '2024',
    description: 'Bureau monolithique et mobilier de direction sur mesure en Solid Surface gris anthracite — sobre, massif, durable.',
    materiaux: ['Corian® Basalt Gray', 'Acier inoxydable mat'],
    images: ['/images/cuisine-grise.jpg'],
    imageHero: '/images/cuisine-grise.jpg',
    featured: false,
  },
  {
    slug: 'detail-corian',
    titre: 'Détail de finition',
    univers: 'Cuisine',
    universSlug: 'cuisine',
    secteur: 'Résidentiel',
    lieu: 'Tunis',
    annee: '2023',
    description: 'Détail de raccord et de finition — l\'invisible qui fait toute la différence.',
    materiaux: ['Corian® Clam Shell'],
    images: ['/images/corian-detail.jpg'],
    imageHero: '/images/corian-detail.jpg',
    featured: false,
  },
]

export function getRealisationBySlug(slug: string): Realisation | undefined {
  return realisations.find((r) => r.slug === slug)
}

export function getRealisationsByUnivers(universSlug: string): Realisation[] {
  return realisations.filter((r) => r.universSlug === universSlug)
}

export const universDisponibles = realisations
  .map((r) => r.univers)
  .filter((v, i, a) => a.indexOf(v) === i)

export const secteursDisponibles = realisations
  .map((r) => r.secteur)
  .filter((v, i, a) => a.indexOf(v) === i)
