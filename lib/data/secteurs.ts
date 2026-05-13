export type Secteur = {
  slug: string
  nom: string
  description: string
  accroche: string
  image: string
  details: string[]
}

export const secteurs: Secteur[] = [
  {
    slug: 'residentiel',
    nom: 'Résidentiel',
    description: 'Villas, appartements, résidences privées',
    accroche: 'Chaque demeure mérite une surface à son image.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Plans de travail cuisine sans joint',
      'Vasques et plans de salle de bain',
      'Mobilier sur mesure intégré',
      'Escaliers et habillages muraux',
      'Agencement complet de la résidence',
    ],
  },
  {
    slug: 'hotellerie',
    nom: 'Hôtellerie',
    description: 'Hôtels, resorts, résidences de tourisme',
    accroche: 'L\'hospitalité se lit dans chaque détail de surface.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Réception et espaces d\'accueil',
      'Salles de bain de chambre en série',
      'Bars et espaces restauration',
      'Spa et espaces bien-être',
      'Mobilier de chambre et de suite',
    ],
  },
  {
    slug: 'healthcare',
    nom: 'Healthcare',
    description: 'Cliniques privées, cabinets médicaux, centres de soins',
    accroche: 'La matière au service de l\'hygiène et de la sérénité.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Plans de travail antibactériens sans joint',
      'Mobilier médical sur mesure',
      'Revêtements de sol et muraux',
      'Comptoirs d\'accueil et banques d\'accueil',
      'Équipements de bloc opératoire',
    ],
  },
  {
    slug: 'commercial',
    nom: 'Commercial',
    description: 'Boutiques, restaurants, espaces de vente',
    accroche: 'La scénographie de votre marque commence par la surface.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Comptoirs et linéaires de vente',
      'Espaces restauration et bar',
      'Cabines d\'essayage et vitrines',
      'Mobilier d\'exposition sur mesure',
      'Signalétique et branding physique',
    ],
  },
  {
    slug: 'institutionnel',
    nom: 'Institutionnel',
    description: 'Administrations, équipements publics, éducation',
    accroche: 'Des surfaces qui durent aussi longtemps que les institutions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Accueils et banques d\'information',
      'Espaces de travail collaboratifs',
      'Cantines et espaces de restauration',
      'Amphithéâtres et salles de conférence',
      'Revêtements durables et entretien facilité',
    ],
  },
  {
    slug: 'tertiaire',
    nom: 'Espaces de travail',
    description: 'Bureaux, sièges sociaux, coworkings',
    accroche: 'L\'environnement façonne la performance.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Bureaux de direction sur mesure',
      'Espaces de réunion et collaboration',
      'Kitchenettes et espaces de pause',
      'Réceptions et lobbies d\'entreprise',
      'Mobilier de bureau personnalisé',
    ],
  },
]

export function getSecteurBySlug(slug: string): Secteur | undefined {
  return secteurs.find((s) => s.slug === slug)
}
