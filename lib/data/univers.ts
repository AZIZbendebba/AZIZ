export type Univers = {
  slug: string
  nom: string
  sousTitre: string
  description: string
  image: string
  href: string
}

export const univers: Univers[] = [
  {
    slug: 'cuisine',
    nom: 'Cuisine',
    sousTitre: 'Plans de travail, îlots centraux et vasques intégrées sans joint',
    description: 'Du plan de travail monolithique à l\'îlot central sculptural, chaque cuisine est pensée pour allier esthétique et durabilité au quotidien.',
    image: '/images/cuisine-ilot.jpg',
    href: '/cuisine',
  },
  {
    slug: 'salle-de-bain',
    nom: 'Salle de Bain',
    sousTitre: 'Vasques, plans de toilette et habillages muraux',
    description: 'Vasques intégrées, plans de toilette sans joint, habillages muraux — des espaces aquatiques sans compromis sur l\'hygiène ni sur l\'élégance.',
    image: '/images/plan-travail-beige.jpg',
    href: '/salle-de-bain',
  },
  {
    slug: 'espace-sante',
    nom: 'Espace Santé',
    sousTitre: 'Paillasses, vasques chirurgicales et mobilier médical',
    description: 'Surfaces antibactériennes sans pore, sans joint, réparables — le Solid Surface répond aux exigences les plus strictes des environnements de soins.',
    image: '/images/cuisine-blanc-vene.jpg',
    href: '/espace-sante',
  },
  {
    slug: 'bureautique',
    nom: 'Bureautique',
    sousTitre: 'Comptoirs d\'accueil, plans de travail et mobilier sur mesure',
    description: 'Comptoirs d\'accueil, bureaux de direction, cloisons acoustiques — des espaces de travail qui incarnent l\'identité de votre entreprise.',
    image: '/images/cuisine-grise.jpg',
    href: '/bureautique',
  },
]
