export type GammeCuisine = {
  id: string
  nom: string
  gamme: 'Moyenne gamme' | 'Haut de gamme'
  accroche: string
  description: string
  caisson: {
    matiere: string
    epaisseur: string
    finition: string
    assemblage: string
  }
  facades: {
    matiere: string
    options: string[]
  }
  quincaillerie: {
    charnieres: string
    tiroirs: string
  }
  pieds: {
    matiere: string
    hauteur: string
    plinthe: string
  }
  planDeTravail: string
  couleurHref: string
}

export const gammesCuisine: GammeCuisine[] = [
  {
    id: 'city',
    nom: 'City',
    gamme: 'Moyenne gamme',
    accroche: 'L\'essentiel, sans compromis.',
    description:
      'Une cuisine robuste et élégante, construite sur une structure MDF de qualité, équipée exclusivement de quincaillerie Blum. Le plan de travail en Solid Surface vient couronner l\'ensemble sans joint ni rupture de matière.',
    caisson: {
      matiere: 'MDF',
      epaisseur: '18 mm',
      finition: 'Mélaminé blanc lisse, chants PVC/ABS collés polyuréthane',
      assemblage: 'Tourillon bois 35×8 mm + excentrique, colle séchage rapide',
    },
    facades: {
      matiere: 'MDF 18 mm',
      options: ['Façade 3D Polymère', 'Façade 2D Quadra'],
    },
    quincaillerie: {
      charnieres:
        'Blum acier inoxydable, ouverture 110°, réglage 3 axes, soft-close intégré',
      tiroirs:
        'Blum monobloc double paroi, profondeur 500 mm, extraction totale, soft-close',
    },
    pieds: {
      matiere: 'ABS',
      hauteur: '150 mm',
      plinthe: 'PVC 150 mm avec joint racleur',
    },
    planDeTravail: 'Solid Surface 100 % acrylique — sans joint, sans raccord visible',
    couleurHref: '/meuble/cuisine',
  },
  {
    id: 'charme',
    nom: 'Charme',
    gamme: 'Haut de gamme',
    accroche: 'La matière sublimée.',
    description:
      'Finitions ultra-brillantes ou matte profonde, quincaillerie Blum de nouvelle génération avec réglage 3D, tiroirs Antaro double paroi métallique. La gamme Charme pousse chaque détail jusqu\'à son seuil d\'excellence.',
    caisson: {
      matiere: 'MDF',
      epaisseur: '18 mm',
      finition: 'Mélaminé couleur au choix, chants PVC/ABS collés polyuréthane',
      assemblage: 'Tourillon + vis assemblage',
    },
    facades: {
      matiere: 'MDF 18 mm',
      options: ['Maxxi Gloss 2D — ultra-brillant', 'Maxxi Matt 2D — mat profond'],
    },
    quincaillerie: {
      charnieres:
        'Blum nouvelle génération, soft-close silencieux, réglage excentrique 3D (vertical, latéral, profondeur)',
      tiroirs:
        'Blum Antaro double paroi métallique, soft-close, profondeur 500 mm',
    },
    pieds: {
      matiere: 'ABS',
      hauteur: '100 mm',
      plinthe: 'Aluminium cache-pieds + PVC 150 mm joint racleur',
    },
    planDeTravail: 'Solid Surface 100 % acrylique — sans joint, antibactérien, thermoformable',
    couleurHref: '/meuble/cuisine',
  },
]
