export type Temoignage = {
  id: string
  texte: string
  auteur: string
  contexte: string
}

export const temoignages: Temoignage[] = [
  {
    id: 'ben-ahmed',
    texte: 'C\'est plus qu\'une simple cuisine, c\'est le véritable cœur de notre maison. Un espace chaleureux et convivial qui invite au partage.',
    auteur: 'Mme & Mr Ben Ahmed',
    contexte: 'Cuisine — nouvelle maison',
  },
  {
    id: 'ben-youssef',
    texte: 'Un service professionnel, une écoute attentive, des finitions impeccables. Le résultat dépasse largement mes attentes.',
    auteur: 'Mr. Ben Youssef',
    contexte: 'Cuisine — Le Lac 2, Tunis',
  },
  {
    id: 'hachicha',
    texte: 'Votre professionnalisme, votre écoute et votre souci du détail ont grandement contribué à la réussite de notre projet.',
    auteur: 'Mme Hachicha',
    contexte: 'Pâtisseries Hachicha',
  },
]
