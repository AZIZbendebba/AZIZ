import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from 'pdf-lib'
import { readFileSync, existsSync } from 'fs'
import path from 'path'
import type { Client } from '@/lib/devis/types'
import { decouperTexte } from '@/lib/devis/pdf'
import { INFOS_ENTITE } from '@/lib/devis/entites'
import type { BonLivraison, BonLivraisonLigne } from './types'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 40
const FOOTER_Y = 54
const TABLE_RIGHT = MARGIN + 525
const NOIR = rgb(0.07, 0.07, 0.07)
const GRIS = rgb(0.4, 0.4, 0.4)
const GRIS_CLAIR = rgb(0.75, 0.75, 0.75)

type Colonne = { label: string; x: number; w: number; right?: boolean }

const COLONNES: Colonne[] = [
  { label: 'Code', x: MARGIN, w: 70 },
  { label: 'Unité', x: MARGIN + 70, w: 60 },
  { label: 'Désignation', x: MARGIN + 130, w: 300 },
  { label: 'Quantité livrée', x: MARGIN + 430, w: 95, right: true },
]

export async function genererBonLivraisonPdf(
  bl: BonLivraison,
  client: Client | null,
  lignes: BonLivraisonLigne[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontSerif = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
  const infosEntite = INFOS_ENTITE[bl.entite]

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
    infosEntite.capitalSocial && `${infosEntite.nomAffiche} au C.S de ${infosEntite.capitalSocial}`,
    `RC : ${infosEntite.rc}    CD : ${infosEntite.codeDouane}    MF : ${infosEntite.matriculeFiscal}`,
    infosEntite.adresse,
    `Tél/Mob : ${infosEntite.telephone}    ${infosEntite.email}`,
  ].filter((ligne): ligne is string => Boolean(ligne))
  const couleurFooter = infosEntite.footerTexteNoir ? NOIR : GRIS

  const texteHautY = FOOTER_Y + (lignesFooter.length - 1) * 9
  const filetY = texteHautY + 15
  const logoY = logoPied ? filetY + 8 : filetY
  const footerReserve = logoY + (logoPied ? logoPied.hauteur : 0) - FOOTER_Y + 20

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

  function texteAligne(texte: string, x: number, w: number, taille: number, f: PDFFont, alignerDroite?: boolean) {
    const posX = alignerDroite ? x + w - f.widthOfTextAtSize(texte, taille) : x
    page.drawText(texte, { x: posX, y, size: taille, font: f })
  }

  function texteEspaceCentre(
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
      page.drawText(caractere, { x: curseurX, y: yTexte, size: taille, font: f, color: couleur })
      curseurX += f.widthOfTextAtSize(caractere, taille) + espacement
    }
  }

  function drawBoiteNumeroDate(): number {
    const x = MARGIN + 300
    const largeur = TABLE_RIGHT - x
    const hauteurLigne = 16
    const hauteur = hauteurLigne * 2
    const yTop = y
    page.drawRectangle({ x, y: yTop - hauteur, width: largeur, height: hauteur, borderColor: NOIR, borderWidth: 0.7 })
    page.drawLine({
      start: { x, y: yTop - hauteurLigne },
      end: { x: x + largeur, y: yTop - hauteurLigne },
      thickness: 0.7,
      color: NOIR,
    })
    const labelWidth = largeur * 0.35
    page.drawLine({
      start: { x: x + labelWidth, y: yTop },
      end: { x: x + labelWidth, y: yTop - hauteur },
      thickness: 0.7,
      color: NOIR,
    })
    const rows: [string, string][] = [
      ['N°', bl.numero],
      ['Date', bl.date_livraison],
    ]
    rows.forEach(([label, valeur], i) => {
      const rowY = yTop - i * hauteurLigne - hauteurLigne + 5
      page.drawText(label, { x: x + 4, y: rowY, size: 8, font: fontBold })
      page.drawText(valeur, { x: x + labelWidth + 4, y: rowY, size: 8, font })
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
    const LOGO_MAX = 64
    const logoPath = infosEntite.logo ? path.join(process.cwd(), infosEntite.logo) : null
    let logoHauteur = LOGO_MAX
    if (logoPath && existsSync(logoPath)) {
      const image = await pdfDoc.embedPng(readFileSync(logoPath))
      const ratio = Math.min(LOGO_MAX / image.width, LOGO_MAX / image.height)
      const largeur = image.width * ratio
      logoHauteur = image.height * ratio
      page.drawImage(image, { x: MARGIN, y: colonneGaucheTop - logoHauteur, width: largeur, height: logoHauteur })
    } else {
      const fondFonce = rgb(0.227, 0.212, 0.196)
      const creme = rgb(0.961, 0.949, 0.925)
      page.drawRectangle({ x: MARGIN, y: colonneGaucheTop - LOGO_MAX, width: LOGO_MAX, height: LOGO_MAX, color: fondFonce })
      texteEspaceCentre('TL', MARGIN + LOGO_MAX / 2, colonneGaucheTop - LOGO_MAX / 2 - 9, 26, fontSerif, 1, creme)
      texteEspaceCentre(infosEntite.nomAffiche.toUpperCase(), MARGIN + LOGO_MAX / 2, colonneGaucheTop - LOGO_MAX + 8, 5.5, font, 1, creme)
    }
    colonneGaucheBas = colonneGaucheTop - logoHauteur
  } else {
    let yTexte = colonneGaucheTop - 10
    const lignesEntete = infosEntite.enteteTexte ?? [infosEntite.nomAffiche]
    lignesEntete.forEach((ligneTexte, i) => {
      const estTitre = i === 0
      page.drawText(ligneTexte, { x: MARGIN, y: yTexte, size: estTitre ? 12 : 7.5, font: estTitre ? fontBold : font })
      yTexte -= estTitre ? 15 : 10
    })
    colonneGaucheBas = yTexte + 3
  }

  y = colonneGaucheTop
  page.drawText('BON DE LIVRAISON', {
    x: TABLE_RIGHT - fontBold.widthOfTextAtSize('BON DE LIVRAISON', 13),
    y: y - 12,
    size: 13,
    font: fontBold,
  })
  y -= 24
  const hauteurBoite = drawBoiteNumeroDate()
  y -= hauteurBoite + 20

  y = Math.min(y, colonneGaucheBas - 14)

  const droiteX = MARGIN + 300

  // --- Bloc client ou destination (gauche) -----------------------------
  if (client) {
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
    if (client.telephone) {
      page.drawText(`Tél : ${client.telephone}`, { x: MARGIN, y, size: 8, font })
      y -= 12
    }
  } else {
    page.drawText('Transfert interne', { x: MARGIN, y, size: 8, font: fontBold })
    y -= 12
  }
  if (bl.destination) {
    page.drawText('Destination :', { x: MARGIN, y, size: 8, font: fontBold })
    const largeurDestination = droiteX - (MARGIN + 80) - 10
    const lignesDestination = decouperTexte(bl.destination, largeurDestination, font, 8)
    lignesDestination.forEach((ligneTexte, i) => {
      page.drawText(ligneTexte, { x: MARGIN + 80, y, size: 8, font })
      if (i < lignesDestination.length - 1) y -= 10
    })
    y -= 12
  }

  y -= 8

  // --- Tableau des lignes ----------------------------------------------
  function enTeteTableau() {
    assurerEspace(20)
    for (const colonne of COLONNES) {
      texteAligne(colonne.label, colonne.x, colonne.w, 8, fontBold, colonne.right)
    }
    y -= 6
    page.drawLine({ start: { x: MARGIN, y }, end: { x: TABLE_RIGHT, y }, thickness: 0.7, color: NOIR })
    y -= 12
  }

  enTeteTableau()

  for (const ligne of lignes) {
    assurerEspace(12)
    const valeurs = [ligne.code ?? '', ligne.unite, ligne.designation, String(ligne.qte_livree)]
    valeurs.forEach((valeur, index) => {
      const colonne = COLONNES[index]
      texteAligne(valeur, colonne.x, colonne.w, 8.5, font, colonne.right)
    })
    y -= 14
  }

  drawFooter(page)

  return pdfDoc.save()
}
