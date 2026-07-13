import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from 'pdf-lib'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import type { Client, Devis, DevisLigne, RegimeTva } from './types'
import { calculerTotaux, prixUnitaireNet, prixTotalNet } from './totaux'
import { INFOS_ENTITE } from './entites'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 40
const FOOTER_Y = 54
const TABLE_RIGHT = MARGIN + 525
const NOIR = rgb(0.07, 0.07, 0.07)
const GRIS = rgb(0.4, 0.4, 0.4)
const GRIS_CLAIR = rgb(0.75, 0.75, 0.75)

// Découpe un texte en lignes qui tiennent chacune dans `largeurMax`.
function decouperTexte(texte: string, largeurMax: number, f: PDFFont, taille: number): string[] {
  const mots = texte.split(' ')
  const lignes: string[] = []
  let ligneCourante = ''
  for (const mot of mots) {
    const essai = ligneCourante ? `${ligneCourante} ${mot}` : mot
    if (f.widthOfTextAtSize(essai, taille) > largeurMax && ligneCourante) {
      lignes.push(ligneCourante)
      ligneCourante = mot
    } else {
      ligneCourante = essai
    }
  }
  if (ligneCourante) lignes.push(ligneCourante)
  return lignes.length > 0 ? lignes : ['']
}

// L'utilisateur saisit juste un nombre de jours ; le PDF affiche la
// formule complète. Si un texte libre a été saisi à la place, on
// l'affiche tel quel plutôt que de forcer le format.
function formaterDelaiLivraison(valeur: string): string {
  const nettoye = valeur.trim()
  return /^\d+$/.test(nettoye) ? `${nettoye} jours à partir date confirmation de commande` : nettoye
}

const REGIME_OPTIONS: { value: RegimeTva; label: string }[] = [
  { value: 'Assujetti', label: 'Assujetti' },
  { value: 'Non assujetti', label: 'Non assujetti' },
  { value: 'Exonere', label: 'Exonéré' },
]

type Colonne = { label: string; label2?: string; x: number; w: number; right?: boolean }

const COLONNES: Colonne[] = [
  { label: 'Code', x: MARGIN, w: 45 },
  { label: 'Unité', x: MARGIN + 45, w: 35 },
  { label: 'Désignation', x: MARGIN + 80, w: 145 },
  { label: 'QTE', x: MARGIN + 225, w: 35, right: true },
  { label: 'Prix.Unit.', label2: 'H.T.V.A', x: MARGIN + 260, w: 65, right: true },
  { label: 'REMISE', label2: 'EN %', x: MARGIN + 325, w: 45, right: true },
  { label: 'Prix.Unit.net', label2: 'H.T.V.A', x: MARGIN + 370, w: 70, right: true },
  { label: 'Prix.total', label2: 'net H.T.V.A', x: MARGIN + 440, w: 85, right: true },
]

export async function genererDevisPdf(
  devis: Devis,
  client: Client,
  lignes: DevisLigne[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontSerif = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const infosEntite = INFOS_ENTITE[devis.entite]
  const totaux = calculerTotaux(lignes)

  // Logo affiché en pied de page (entités sans logo en en-tête).
  let logoPied: { image: PDFImage; largeur: number; hauteur: number } | null = null
  if (infosEntite.logoPosition === 'pied' && infosEntite.logo) {
    const logoPiedPath = path.join(process.cwd(), infosEntite.logo)
    if (existsSync(logoPiedPath)) {
      const image = await pdfDoc.embedPng(readFileSync(logoPiedPath))
      const maxW = 260
      const maxH = 95
      const ratio = Math.min(maxW / image.width, maxH / image.height)
      logoPied = { image, largeur: image.width * ratio, hauteur: image.height * ratio }
    }
  }
  const lignesFooter = [
    // Pas de capital social communiqué : la ligne "au C.S de ..." ne doit
    // pas apparaître du tout (ni la ligne, ni un placeholder).
    infosEntite.capitalSocial && `${infosEntite.nomAffiche} au C.S de ${infosEntite.capitalSocial}`,
    `RC : ${infosEntite.rc}    CD : ${infosEntite.codeDouane}    MF : ${infosEntite.matriculeFiscal}`,
    infosEntite.adresse,
    `Tél/Mob : ${infosEntite.telephone}    ${infosEntite.email}`,
  ].filter((ligne): ligne is string => Boolean(ligne))
  const couleurFooter = infosEntite.footerTexteNoir ? NOIR : GRIS

  // Construit le pied de page du bas vers le haut : texte légal, puis
  // (si besoin) le filet séparateur, puis le logo centré au-dessus — pour
  // garantir qu'aucun élément ne chevauche le suivant.
  const texteHautY = FOOTER_Y + (lignesFooter.length - 1) * 9
  const filetY = texteHautY + 15
  const logoY = logoPied ? filetY + 8 : filetY
  const footerReserve = (logoY + (logoPied ? logoPied.hauteur : 0) - FOOTER_Y) + 20

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN

  function drawFooter(p: PDFPage) {
    lignesFooter.forEach((texte, i) => {
      const x =
        infosEntite.footerAlignement === 'centre'
          ? (PAGE_WIDTH - font.widthOfTextAtSize(texte, 7)) / 2
          : MARGIN
      p.drawText(texte, { x, y: texteHautY - i * 9, size: 7, font, color: couleurFooter })
    })
    p.drawLine({
      start: { x: MARGIN, y: filetY },
      end: { x: PAGE_WIDTH - MARGIN, y: filetY },
      thickness: 0.5,
      color: GRIS_CLAIR,
    })
    if (logoPied) {
      p.drawImage(logoPied.image, {
        x: (PAGE_WIDTH - logoPied.largeur) / 2,
        y: logoY,
        width: logoPied.largeur,
        height: logoPied.hauteur,
      })
    }
  }

  function nouvellePage() {
    drawFooter(page)
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    y = PAGE_HEIGHT - MARGIN
  }

  function assurerEspace(hauteur: number) {
    if (y - hauteur < FOOTER_Y + footerReserve) nouvellePage()
  }

  function texteAligne(p: PDFPage, texte: string, x: number, w: number, taille: number, f: PDFFont, alignerDroite?: boolean) {
    const posX = alignerDroite ? x + w - f.widthOfTextAtSize(texte, taille) : x
    p.drawText(texte, { x: posX, y, size: taille, font: f })
  }

  // Dessine du texte avec un espacement additionnel entre lettres, centré
  // sur `centreX` (approximation d'un texte "tracké" de type logo).
  function texteEspaceCentre(
    p: PDFPage,
    texte: string,
    centreX: number,
    yTexte: number,
    taille: number,
    f: PDFFont,
    espacement: number,
    couleur = NOIR
  ) {
    const largeurTotale =
      texte.split('').reduce((acc, c) => acc + f.widthOfTextAtSize(c, taille), 0) + espacement * (texte.length - 1)
    let curseurX = centreX - largeurTotale / 2
    for (const caractere of texte) {
      p.drawText(caractere, { x: curseurX, y: yTexte, size: taille, font: f, color: couleur })
      curseurX += f.widthOfTextAtSize(caractere, taille) + espacement
    }
  }

  // Table de 2 lignes (N° / Date), façon "en-tête de document"
  function drawBoiteNumeroDate(): number {
    const x = MARGIN + 300
    const largeur = TABLE_RIGHT - x
    const hauteurLigne = 16
    const hauteur = hauteurLigne * 2
    const yTop = y
    page.drawRectangle({ x, y: yTop - hauteur, width: largeur, height: hauteur, borderColor: NOIR, borderWidth: 0.7 })
    page.drawLine({ start: { x, y: yTop - hauteurLigne }, end: { x: x + largeur, y: yTop - hauteurLigne }, thickness: 0.7, color: NOIR })
    const labelWidth = largeur * 0.35
    page.drawLine({ start: { x: x + labelWidth, y: yTop }, end: { x: x + labelWidth, y: yTop - hauteur }, thickness: 0.7, color: NOIR })
    const lignes: [string, string][] = [
      ['N°', devis.numero],
      ['Date', devis.date],
    ]
    lignes.forEach(([label, valeur], i) => {
      const rowY = yTop - i * hauteurLigne - hauteurLigne + 5
      page.drawText(label, { x: x + 4, y: rowY, size: 8, font: fontBold })
      page.drawText(valeur, { x: x + labelWidth + 4, y: rowY, size: 8, font })
    })
    return hauteur
  }

  // Table à 3 cases (régime TVA) avec une croix dans la case active
  function drawTableRegimeTva(yTop: number): number {
    const x = MARGIN
    const largeur = 210
    const hauteurLigne = 14
    const hauteur = hauteurLigne * REGIME_OPTIONS.length
    const marqueLargeur = 26
    page.drawRectangle({ x, y: yTop - hauteur, width: largeur, height: hauteur, borderColor: NOIR, borderWidth: 0.7 })
    page.drawLine({
      start: { x: x + largeur - marqueLargeur, y: yTop },
      end: { x: x + largeur - marqueLargeur, y: yTop - hauteur },
      thickness: 0.7,
      color: NOIR,
    })
    REGIME_OPTIONS.forEach((option, i) => {
      const rowTop = yTop - i * hauteurLigne
      if (i > 0) {
        page.drawLine({ start: { x, y: rowTop }, end: { x: x + largeur, y: rowTop }, thickness: 0.5, color: GRIS_CLAIR })
      }
      const rowY = rowTop - hauteurLigne + 4
      page.drawText(option.label, { x: x + 4, y: rowY, size: 8, font })
      if (option.value === devis.regime_tva) {
        page.drawText('X', { x: x + largeur - marqueLargeur / 2 - 3, y: rowY, size: 9, font: fontBold })
      }
    })
    return hauteur
  }

  // --- En-tête -------------------------------------------------------
  if (infosEntite.email) {
    page.drawText(`Email : ${infosEntite.email}`, {
      x: TABLE_RIGHT - font.widthOfTextAtSize(`Email : ${infosEntite.email}`, 7),
      y,
      size: 7,
      font,
      color: GRIS,
    })
    y -= 16
  }

  const colonneGaucheTop = y
  let colonneGaucheBas: number

  if (infosEntite.logoPosition === 'entete') {
    const LOGO_MAX = 64 // boîte carrée compacte, comme dans le gabarit de référence
    const logoPath = infosEntite.logo ? path.join(process.cwd(), infosEntite.logo) : null
    let logoHauteur = LOGO_MAX
    if (logoPath && existsSync(logoPath)) {
      const bytes = readFileSync(logoPath)
      const image = await pdfDoc.embedPng(bytes)
      const ratio = Math.min(LOGO_MAX / image.width, LOGO_MAX / image.height)
      const largeur = image.width * ratio
      logoHauteur = image.height * ratio
      page.drawImage(image, { x: MARGIN, y: colonneGaucheTop - logoHauteur, width: largeur, height: logoHauteur })
    } else {
      // Reconstitution graphique en attendant le fichier logo réel (fond
      // gris chaud foncé + monogramme "TL" et légende en crème, d'après
      // l'aperçu visuel transmis).
      const fondFonce = rgb(0.227, 0.212, 0.196)
      const creme = rgb(0.961, 0.949, 0.925)
      page.drawRectangle({ x: MARGIN, y: colonneGaucheTop - LOGO_MAX, width: LOGO_MAX, height: LOGO_MAX, color: fondFonce })
      texteEspaceCentre(page, 'TL', MARGIN + LOGO_MAX / 2, colonneGaucheTop - LOGO_MAX / 2 - 9, 26, fontSerif, 1, creme)
      texteEspaceCentre(page, 'TECHNO-LOGIKA', MARGIN + LOGO_MAX / 2, colonneGaucheTop - LOGO_MAX + 8, 5.5, font, 1, creme)
    }
    colonneGaucheBas = colonneGaucheTop - logoHauteur
  } else {
    // Pas de logo en en-tête : texte libre (raison sociale + coordonnées).
    let yTexte = colonneGaucheTop - 10
    const lignesEntete = infosEntite.enteteTexte ?? [infosEntite.nomAffiche]
    lignesEntete.forEach((ligneTexte, i) => {
      const estTitre = i === 0
      page.drawText(ligneTexte, { x: MARGIN, y: yTexte, size: estTitre ? 12 : 7.5, font: estTitre ? fontBold : font })
      yTexte -= estTitre ? 15 : 10
    })
    colonneGaucheBas = yTexte + 3
  }

  // Titre + boîte N°/Date alignés avec le haut de la colonne gauche
  y = colonneGaucheTop
  page.drawText('OFFRE DE PRIX', {
    x: TABLE_RIGHT - fontBold.widthOfTextAtSize('OFFRE DE PRIX', 13),
    y: y - 12,
    size: 13,
    font: fontBold,
  })
  y -= 24
  const hauteurBoite = drawBoiteNumeroDate()
  y -= hauteurBoite + 20

  // Le bloc suivant doit rester sous la colonne gauche (logo ou texte) ET
  // sous le bloc titre/N°/Date, quel que soit leur contenu respectif.
  y = Math.min(y, colonneGaucheBas - 14)

  const droiteX = MARGIN + 300

  // --- Bloc client (gauche) -------------------------------------------
  const yBlocInfos = y
  page.drawText('Code Client :', { x: MARGIN, y, size: 8, font: fontBold })
  page.drawText(client.code_client ?? '', { x: MARGIN + 65, y, size: 8, font })
  y -= 12
  page.drawText('Client :', { x: MARGIN, y, size: 8, font: fontBold })
  page.drawText(client.nom, { x: MARGIN + 65, y, size: 8, font })
  y -= 12
  if (client.adresse) {
    page.drawText('Adresse :', { x: MARGIN, y, size: 8, font: fontBold })
    const largeurAdresse = droiteX - (MARGIN + 65) - 10
    const lignesAdresse = decouperTexte(client.adresse, largeurAdresse, font, 8)
    lignesAdresse.forEach((ligneTexte, i) => {
      page.drawText(ligneTexte, { x: MARGIN + 65, y, size: 8, font })
      if (i < lignesAdresse.length - 1) y -= 10
    })
    y -= 12
  }
  const contact = [client.telephone && `Tél : ${client.telephone}`, client.email].filter(Boolean).join('   ')
  if (contact) {
    page.drawText(contact, { x: MARGIN, y, size: 8, font })
    y -= 12
  }

  // --- Bloc infos commerciales (droite) --------------------------------
  let yDroite = yBlocInfos
  const infosCommerciales: { label: string; valeur: string }[] = []
  if (devis.mode_livraison) {
    infosCommerciales.push({ label: 'Mode de livraison', valeur: devis.mode_livraison })
  }
  if (devis.delai_livraison) {
    infosCommerciales.push({ label: 'Délai de livraison', valeur: formaterDelaiLivraison(devis.delai_livraison) })
  }
  if (devis.mode_paiement) {
    // Texte fixe sur le PDF quel que soit le mode choisi dans le formulaire
    // (Chèque/Espèce) — ce choix ne sert que pour l'étape Facture à venir.
    infosCommerciales.push({ label: 'Mode de paiement', valeur: '50% avance à la commande' })
    infosCommerciales.push({ label: 'Solde', valeur: '48h avant enlèvement' })
  }
  if (devis.validite) {
    infosCommerciales.push({ label: "Validité de l'offre", valeur: devis.validite })
  }

  const droiteLabelWidth = 100
  const droiteValeurLargeur = TABLE_RIGHT - (droiteX + droiteLabelWidth)
  infosCommerciales.forEach(({ label, valeur }) => {
    page.drawText(`${label} :`, { x: droiteX, y: yDroite, size: 8, font: fontBold })
    const lignesValeur = decouperTexte(valeur, droiteValeurLargeur, font, 8)
    lignesValeur.forEach((ligneTexte, i) => {
      page.drawText(ligneTexte, { x: droiteX + droiteLabelWidth, y: yDroite, size: 8, font })
      if (i < lignesValeur.length - 1) yDroite -= 10
    })
    yDroite -= 12
  })

  y = Math.min(y, yDroite) - 10

  // --- Régime TVA + matricule fiscal ----------------------------------
  const yRegime = y
  const hauteurRegime = drawTableRegimeTva(yRegime)
  if (devis.matricule_fiscal) {
    page.drawText(devis.matricule_fiscal, { x: MARGIN + 230, y: yRegime - hauteurRegime / 2 - 3, size: 10, font: fontBold })
  }
  y -= hauteurRegime + 18

  // --- Tableau des lignes ----------------------------------------------
  function enTeteTableau() {
    assurerEspace(24)
    for (const colonne of COLONNES) {
      texteAligne(page, colonne.label, colonne.x, colonne.w, 7.5, fontBold, colonne.right)
      if (colonne.label2) {
        const yLabel2 = y
        y -= 9
        texteAligne(page, colonne.label2, colonne.x, colonne.w, 7.5, fontBold, colonne.right)
        y = yLabel2
      }
    }
    y -= 18
    page.drawLine({ start: { x: MARGIN, y }, end: { x: TABLE_RIGHT, y }, thickness: 0.7, color: NOIR })
    y -= 12
  }

  enTeteTableau()

  let sectionCourante: string | null = null
  for (const ligne of lignes) {
    const nouvelleSection = Boolean(ligne.section) && ligne.section !== sectionCourante
    if (ligne.section) sectionCourante = ligne.section

    if (nouvelleSection) {
      assurerEspace(20)
      y -= 6
      page.drawText(ligne.section as string, { x: MARGIN, y, size: 9, font: fontBold })
      y -= 16
    }
    if (ligne.sous_groupe) {
      assurerEspace(12)
      page.drawText(ligne.sous_groupe, { x: MARGIN, y, size: 7.5, font, color: GRIS })
      y -= 11
    }

    assurerEspace(12)
    const net = prixUnitaireNet(ligne.prix_unitaire_htva, ligne.remise_pct)
    const total = prixTotalNet(ligne)
    const valeurs = [
      ligne.code ?? '',
      ligne.unite,
      ligne.designation,
      String(ligne.qte),
      ligne.prix_unitaire_htva.toFixed(3),
      ligne.remise_pct != null ? `${ligne.remise_pct}%` : '',
      net.toFixed(3),
      total.toFixed(3),
    ]
    valeurs.forEach((valeur, index) => {
      const colonne = COLONNES[index]
      texteAligne(page, valeur, colonne.x, colonne.w, 8, font, colonne.right)
    })
    y -= 13
  }

  // --- Totaux -----------------------------------------------------------
  assurerEspace(90)
  y -= 10
  const totalsX = TABLE_RIGHT - 160
  const ligneTotal = (label: string, valeur: string, gras = false) => {
    const f = gras ? fontBold : font
    page.drawText(label, { x: totalsX, y, size: 9, font: f })
    const vw = f.widthOfTextAtSize(valeur, 9)
    page.drawText(valeur, { x: TABLE_RIGHT - vw, y, size: 9, font: f })
    y -= 13
  }
  ligneTotal('Total HTVA', totaux.totalHtva.toFixed(3))
  ligneTotal('Fodec 1%', totaux.fodec.toFixed(3))
  ligneTotal('TVA 19%', totaux.tva.toFixed(3))
  ligneTotal('Timbre fiscal', totaux.timbre.toFixed(3))
  page.drawLine({
    start: { x: totalsX, y: y + 8 },
    end: { x: TABLE_RIGHT, y: y + 8 },
    thickness: 0.7,
    color: NOIR,
  })
  ligneTotal('TOTAL TTC', `${totaux.totalTtc.toFixed(3)} DT`, true)

  drawFooter(page)

  return pdfDoc.save()
}
