export type Teinte = {
  id: string
  nom: string
  hex: string
  description?: string
}

export type CategorieNuancier = {
  id: string
  nom: string
  teintes: Teinte[]
}

export const nuancier: CategorieNuancier[] = [
  {
    id: 'unis-classiques',
    nom: 'Unis classiques',
    teintes: [
      { id: 'glacier-white', nom: 'Glacier White', hex: '#F8F8F6' },
      { id: 'cameo-white', nom: 'Cameo White', hex: '#F4F0E8' },
      { id: 'bisque', nom: 'Bisque', hex: '#EDE5D8' },
      { id: 'bone', nom: 'Bone', hex: '#E8DFD0' },
      { id: 'dove', nom: 'Dove', hex: '#D8D4CC' },
      { id: 'abalone', nom: 'Abalone', hex: '#C8C4BE' },
      { id: 'platinum', nom: 'Platinum', hex: '#B8B4B0' },
      { id: 'linen', nom: 'Linen', hex: '#DDD4C0' },
    ],
  },
  {
    id: 'veines-naturels',
    nom: 'Veinés naturels',
    teintes: [
      { id: 'calacatta-natura', nom: 'Calacatta Natura', hex: '#F0EDE8', description: 'Fond blanc, veines gris-or' },
      { id: 'rain-cloud', nom: 'Rain Cloud', hex: '#D8D8D8', description: 'Fond gris perle, veines grises' },
      { id: 'witch-hazel', nom: 'Witch Hazel', hex: '#C8C0B4', description: 'Fond beige chaud, veines taupe' },
      { id: 'calacatta-nuvo', nom: 'Calacatta Nuvo', hex: '#EEEAE4', description: 'Fond blanc crème, veines dorées' },
      { id: 'clam-shell', nom: 'Clam Shell', hex: '#D4C8B8', description: 'Fond sable, veines naturelles' },
      { id: 'stratus-white', nom: 'Stratus White', hex: '#E8E8E4', description: 'Fond blanc, veines légères' },
      { id: 'aurora', nom: 'Aurora', hex: '#E4DED8', description: 'Tons neutres mêlés' },
      { id: 'sahara', nom: 'Sahara', hex: '#D4C4A8', description: 'Fond sable doré' },
    ],
  },
  {
    id: 'sombres-premium',
    nom: 'Sombres premium',
    teintes: [
      { id: 'deep-black-quartz', nom: 'Deep Black Quartz', hex: '#1A1A1A', description: 'Noir profond, paillettes subtiles' },
      { id: 'nocturne', nom: 'Nocturne', hex: '#2A2A2E', description: 'Noir bleuté mat' },
      { id: 'deep-nocturne', nom: 'Deep Nocturne', hex: '#222228', description: 'Noir absolu velouté' },
      { id: 'cocoa-brown', nom: 'Cocoa Brown', hex: '#3C2E24', description: 'Brun chocolat profond' },
      { id: 'basalt-gray', nom: 'Basalt Gray', hex: '#404040', description: 'Gris anthracite mat' },
      { id: 'dark-field', nom: 'Dark Field', hex: '#2E3030', description: 'Vert ardoise foncé' },
      { id: 'midnight-marble', nom: 'Midnight Marble', hex: '#303038', description: 'Noir veiné gris argent' },
    ],
  },
  {
    id: 'couleurs-accent',
    nom: 'Couleurs accent',
    teintes: [
      { id: 'tumbleweed', nom: 'Tumbleweed', hex: '#C8A878', description: 'Beige doré chaud' },
      { id: 'fawn', nom: 'Fawn', hex: '#C0A080', description: 'Brun rosé doux' },
      { id: 'seaglass', nom: 'Seaglass', hex: '#A8C0B8', description: 'Vert d\'eau doux' },
      { id: 'meadow', nom: 'Meadow', hex: '#88A880', description: 'Vert sauge naturel' },
      { id: 'mist', nom: 'Mist', hex: '#B0B8C0', description: 'Bleu gris poudré' },
      { id: 'bermuda', nom: 'Bermuda', hex: '#78A8A0', description: 'Bleu-vert tropical' },
      { id: 'camouflage', nom: 'Camouflage', hex: '#8C9078', description: 'Kaki naturel' },
    ],
  },
]

export const toutesLesteintes = nuancier.flatMap((c) => c.teintes)
