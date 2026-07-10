import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib'
import { readFileSync } from 'fs'
import path from 'path'
import type { Client, Devis, DevisLigne } from './types'
import { calculerTotaux, prixUnitaireNet, prixTotalNet } from './totaux'
import { INFOS_ENTITE } from './entites'

const PAGE_WIDTH = 595.28
const PAGE_HEIGHT = 841.89
const MARGIN = 40
const FOOTER_Y = 40

const REGIME_LABEL: Record<string, string> = {
  Assujetti: 'Assujetti',
  'Non assujetti': 'Non assujetti',
  Exonere: 'Exonéré',
}

type Colonne = { label: string; x: number; w: number; right?: boolean }

const COLONNES: Colonne[] = [
  { label: 'Code', x: MARGIN, w: 45 },
  { label: 'Unité', x: MARGIN + 45, w: 35 },
  { label: 'Désignation', x: MARGIN + 80, w: 155 },
  { label: 'QTE', x: MARGIN + 235, w: 40, right: true },
  { label: 'Prix Unit. HTVA', x: MARGIN + 275, w: 70, right: true },
  { label: 'Remise %', x: MARGIN + 345, w: 45, right: true },
  { label: 'Prix Unit. net', x: MARGIN + 390, w: 65, right: true },
  { label: 'Prix total net', x: MARGIN + 455, w: 70, right: true },
]
const TABLE_RIGHT = MARGIN + 525

export async function genererDevisPdf(
  devis: Devis,
  client: Client,
  lignes: DevisLigne[]
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const infosEntite = INFOS_ENTITE[devis.entite]
  const totaux = calculerTotaux(lignes)

  let page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
  let y = PAGE_HEIGHT - MARGIN

  function drawFooter(p: PDFPage) {
    p.drawLine({
      start: { x: MARGIN, y: FOOTER_Y + 14 },
      end: { x: PAGE_WIDTH - MARGIN, y: FOOTER_Y + 14 },
      thickness: 0.5,
      color: rgb(0.75, 0.75, 0.75),
    })
    p.drawText(
      `${infosEntite.nomAffiche} — RC ${infosEntite.rc} — M.F. ${infosEntite.matriculeFiscal} — CD ${infosEntite.codeDouane}`,
      { x: MARGIN, y: FOOTER_Y, size: 7, font, color: rgb(0.35, 0.35, 0.35) }
    )
    p.drawText(`${infosEntite.adresse} — Tél : ${infosEntite.telephone} — ${infosEntite.email}`, {
      x: MARGIN,
      y: FOOTER_Y - 10,
      size: 7,
      font,
      color: rgb(0.35, 0.35, 0.35),
    })
  }

  function nouvellePage() {
    drawFooter(page)
    page = pdfDoc.addPage([PAGE_WIDTH, PAGE_HEIGHT])
    y = PAGE_HEIGHT - MARGIN
  }

  function assurerEspace(hauteur: number) {
    if (y - hauteur < FOOTER_Y + 24) nouvellePage()
  }

  function texteAligne(p: PDFPage, texte: string, x: number, w: number, taille: number, f: PDFFont, alignerDroite?: boolean) {
    const posX = alignerDroite ? x + w - f.widthOfTextAtSize(texte, taille) : x
    p.drawText(texte, { x: posX, y, size: taille, font: f })
  }

  // En-tête : logo (ou nom de l'entité) + bloc devis
  if (infosEntite.logo) {
    try {
      const bytes = readFileSync(path.join(process.cwd(), infosEntite.logo))
      const image = await pdfDoc.embedPng(bytes)
      const largeur = 120
      const hauteur = (image.height / image.width) * largeur
      page.drawImage(image, { x: MARGIN, y: y - hauteur, width: largeur, height: hauteur })
    } catch {
      page.drawText(infosEntite.nomAffiche.toUpperCase(), { x: MARGIN, y: y - 14, size: 14, font: fontBold })
    }
  } else {
    page.drawText(infosEntite.nomAffiche.toUpperCase(), { x: MARGIN, y: y - 14, size: 14, font: fontBold })
  }

  const headerRightX = PAGE_WIDTH - MARGIN - 220
  let hy = y
  const ligneEntete = (texte: string, gras = false) => {
    page.drawText(texte, { x: headerRightX, y: hy, size: gras ? 12 : 9, font: gras ? fontBold : font })
    hy -= gras ? 16 : 12
  }
  ligneEntete(`OFFRE DE PRIX ${devis.numero}`, true)
  ligneEntete(`Date : ${devis.date}`)
  if (devis.validite) ligneEntete(`Validité : ${devis.validite}`)
  ligneEntete(`Régime TVA : ${REGIME_LABEL[devis.regime_tva] ?? devis.regime_tva}`)
  if (devis.matricule_fiscal) ligneEntete(`M.F. : ${devis.matricule_fiscal}`)

  y -= 75

  // Bloc client
  assurerEspace(60)
  page.drawRectangle({
    x: MARGIN,
    y: y - 55,
    width: TABLE_RIGHT - MARGIN,
    height: 55,
    borderColor: rgb(0.8, 0.8, 0.8),
    borderWidth: 0.5,
  })
  let cy = y - 12
  const ligneClient = (texte: string) => {
    page.drawText(texte, { x: MARGIN + 8, y: cy, size: 9, font })
    cy -= 11
  }
  ligneClient(client.nom)
  if (client.code_client) ligneClient(`Code client : ${client.code_client}`)
  if (client.adresse) ligneClient(client.adresse)
  const contact = [client.telephone && `Tél : ${client.telephone}`, client.email].filter(Boolean).join(' — ')
  if (contact) ligneClient(contact)
  const conditions = [
    devis.mode_livraison && `Livraison : ${devis.mode_livraison}`,
    devis.delai_livraison && `Délai : ${devis.delai_livraison}`,
    devis.mode_paiement && `Paiement : ${devis.mode_paiement}`,
  ]
    .filter(Boolean)
    .join('   ')
  if (conditions) ligneClient(conditions)

  y -= 70

  function enTeteTableau() {
    assurerEspace(20)
    for (const colonne of COLONNES) {
      texteAligne(page, colonne.label, colonne.x, colonne.w, 8, fontBold, colonne.right)
    }
    y -= 6
    page.drawLine({ start: { x: MARGIN, y }, end: { x: TABLE_RIGHT, y }, thickness: 0.7, color: rgb(0.1, 0.1, 0.1) })
    y -= 12
  }

  enTeteTableau()

  let sectionCourante: string | null = null
  for (const ligne of lignes) {
    const nouvelleSection = Boolean(ligne.section) && ligne.section !== sectionCourante
    if (ligne.section) sectionCourante = ligne.section

    if (nouvelleSection) {
      assurerEspace(16)
      y -= 4
      page.drawText(ligne.section as string, { x: MARGIN, y, size: 9, font: fontBold })
      y -= 14
    }
    if (ligne.sous_groupe) {
      assurerEspace(12)
      page.drawText(ligne.sous_groupe, { x: MARGIN, y, size: 7.5, font, color: rgb(0.4, 0.4, 0.4) })
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

  // Totaux
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
    color: rgb(0.1, 0.1, 0.1),
  })
  ligneTotal('TOTAL TTC', `${totaux.totalTtc.toFixed(3)} DT`, true)

  drawFooter(page)

  return pdfDoc.save()
}
