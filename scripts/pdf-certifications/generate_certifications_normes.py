"""
Génère le PDF "Certifications & Normes" (2 pages, A4) pour la section
Ressources / Documents & téléchargements du site Solid Surface Tunisie.

Usage:
    python3 generate_certifications_normes.py [chemin_de_sortie.pdf]
"""

import sys
import os

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.lib.colors import HexColor

# ----------------------------------------------------------------------------
# Charte graphique
# ----------------------------------------------------------------------------

CREAM = HexColor("#F7F5F0")
DARK = HexColor("#1C1C1C")
GRAY = HexColor("#6B6B66")
GOLD = HexColor("#B8934A")
GOLD_LIGHT = HexColor("#D9C08A")
WHITE = HexColor("#FFFFFF")
BORDER = HexColor("#E6E2D8")

F_REG = "Helvetica"
F_BOLD = "Helvetica-Bold"
F_ITAL = "Helvetica-Oblique"

PAGE_W, PAGE_H = A4
MARGIN = 46
CONTENT_W = PAGE_W - 2 * MARGIN
GUTTER = 14
ROW_GAP = 8
SECTION_GAP = 10

# Card layout constants
BADGE_R = 16
PAD = 14
GAP_BADGE_TITLE = 9
TITLE_SIZE = 11
DESC_SIZE = 8.8
DESC_LEADING = 11.8
LABEL_SIZE = 7.3


# ----------------------------------------------------------------------------
# Helpers texte
# ----------------------------------------------------------------------------

def wrap_text(text, font, size, max_width):
    """Découpe `text` en lignes qui tiennent dans `max_width`."""
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        if stringWidth(trial, font, size) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def tracked_width(text, font, size, tracking):
    return stringWidth(text, font, size) + tracking * max(len(text) - 1, 0)


def wrap_tracked_text(text, font, size, tracking, max_width):
    """Comme wrap_text, mais mesure la largeur avec tracking (pour les labels
    en majuscules espacées)."""
    words = text.split()
    lines = []
    cur = ""
    for w in words:
        trial = (cur + " " + w).strip()
        if tracked_width(trial, font, size, tracking) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_tracked(c, x, y, text, font, size, color, tracking=1.4, align="left"):
    """Dessine du texte avec un espacement de lettres (tracking) manuel."""
    c.setFont(font, size)
    c.setFillColor(color)
    w = tracked_width(text, font, size, tracking)
    if align == "center":
        x = x - w / 2
    elif align == "right":
        x = x - w
    cx = x
    for ch in text:
        c.drawString(cx, y, ch)
        cx += stringWidth(ch, font, size) + tracking
    return w


def draw_centered(c, x_center, y, text, font, size, color):
    c.setFont(font, size)
    c.setFillColor(color)
    w = stringWidth(text, font, size)
    c.drawString(x_center - w / 2, y, text)


# ----------------------------------------------------------------------------
# En-tête / pied de page communs
# ----------------------------------------------------------------------------

def new_page(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)


def draw_footer(c, page_num, page_total):
    line_y = 40
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.75)
    c.line(MARGIN, line_y, PAGE_W - MARGIN, line_y)

    draw_centered(c, PAGE_W / 2, line_y - 15, "PROMACRYL — SOLID SURFACE TUNISIE",
                  F_BOLD, 7.5, GRAY)
    draw_centered(c, PAGE_W / 2, line_y - 27, f"{page_num} / {page_total}",
                  F_REG, 7.5, GRAY)


def draw_header(c, kicker, title, subtitle_lines):
    """Bloc d'en-tête centré : kicker or, H1, sous-titre, ligne or centrée.
    Retourne la position Y (haut de page) où le contenu peut démarrer.
    """
    y = PAGE_H - MARGIN

    draw_tracked(c, PAGE_W / 2, y, kicker, F_BOLD, 9, GOLD,
                 tracking=2.6, align="center")
    y -= 20

    c.setFont(F_BOLD, 22)
    c.setFillColor(DARK)
    tw = stringWidth(title, F_BOLD, 22)
    c.drawString(PAGE_W / 2 - tw / 2, y, title)
    y -= 19

    c.setFont(F_REG, 10)
    c.setFillColor(GRAY)
    for line in subtitle_lines:
        lw = stringWidth(line, F_REG, 10)
        c.drawString(PAGE_W / 2 - lw / 2, y, line)
        y -= 13

    y -= 5
    c.setStrokeColor(GOLD)
    c.setLineWidth(1.4)
    c.line(PAGE_W / 2 - 22, y, PAGE_W / 2 + 22, y)
    y -= 18

    return y


def draw_section_title(c, y, text):
    """Titre de section : label or majuscule, souligné d'un filet or fin."""
    c.setFont(F_BOLD, 10.5)
    c.setFillColor(GOLD)
    draw_tracked(c, MARGIN, y, text, F_BOLD, 10.5, GOLD, tracking=1.2)
    y -= 7
    c.setStrokeColor(GOLD_LIGHT)
    c.setLineWidth(1)
    c.line(MARGIN, y, MARGIN + 34, y)
    y -= 9
    return y


# ----------------------------------------------------------------------------
# Cards "certification" (badge + titre + description + label)
# ----------------------------------------------------------------------------

LABEL_TRACKING = 1.0
LABEL_LEADING = 8.8


def measure_card(width, desc, label):
    """Calcule la hauteur nécessaire, le décalage X texte (après le badge)
    et les lignes du label (replié si trop long pour la largeur de la card)."""
    text_x_offset = PAD + BADGE_R * 2 + GAP_BADGE_TITLE
    text_w = width - text_x_offset - PAD
    desc_lines = wrap_text(desc, F_REG, DESC_SIZE, text_w)
    label_lines = wrap_tracked_text(label, F_BOLD, LABEL_SIZE, LABEL_TRACKING,
                                     width - 2 * PAD)
    header_h = max(BADGE_R * 2, TITLE_SIZE * 1.2)
    desc_h = len(desc_lines) * DESC_LEADING
    label_block_h = 10 + len(label_lines) * LABEL_LEADING + 4
    height = PAD + header_h + 10 + desc_h + 14 + label_block_h + PAD
    return height, desc_lines, text_x_offset, label_lines


def draw_badge(c, cx, cy, r, text):
    c.saveState()
    c.setFillColor(GOLD_LIGHT)
    c.setStrokeColor(GOLD)
    c.setLineWidth(1)
    c.circle(cx, cy, r, stroke=1, fill=1)
    if len(text) <= 3:
        size = 9.5
    elif len(text) <= 4:
        size = 8.5
    else:
        size = 7.2
    c.setFont(F_BOLD, size)
    c.setFillColor(DARK)
    w = stringWidth(text, F_BOLD, size)
    c.drawString(cx - w / 2, cy - size * 0.33, text)
    c.restoreState()


def draw_card(c, x, y_top, width, height, badge_text, title, desc_lines,
              text_x_offset, label_lines):
    """Dessine une card. Le titre est décalé après le badge (text_x_offset),
    et TOUTES les lignes de description démarrent au même X que le titre
    (et non sous le badge / bord de la card) — c'est le point corrigé.
    """
    c.saveState()
    c.setFillColor(WHITE)
    c.setStrokeColor(BORDER)
    c.setLineWidth(1)
    c.roundRect(x, y_top - height, width, height, 6, stroke=1, fill=1)
    c.restoreState()

    cx_badge = x + PAD + BADGE_R
    cy_badge = y_top - PAD - BADGE_R
    draw_badge(c, cx_badge, cy_badge, BADGE_R, badge_text)

    text_x = x + text_x_offset  # même décalage pour le titre ET la description
    title_y = cy_badge - TITLE_SIZE * 0.35
    c.setFont(F_BOLD, TITLE_SIZE)
    c.setFillColor(DARK)
    c.drawString(text_x, title_y, title)

    desc_top = y_top - PAD - max(BADGE_R * 2, TITLE_SIZE * 1.2) - 10
    c.setFont(F_REG, DESC_SIZE)
    c.setFillColor(GRAY)
    yy = desc_top
    for line in desc_lines:
        c.drawString(text_x, yy, line)  # aligné sous le titre, pas sous le badge
        yy -= DESC_LEADING

    # Label bas de card (majuscules or, replié si nécessaire) + filet au-dessus
    # La dernière ligne du label est toujours à PAD du bas de la card.
    last_line_y = y_top - height + PAD
    first_line_y = last_line_y + (len(label_lines) - 1) * LABEL_LEADING
    rule_y = first_line_y + LABEL_SIZE + 4
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.75)
    c.line(x + PAD, rule_y, x + width - PAD, rule_y)
    ly = first_line_y
    for line in label_lines:
        draw_tracked(c, x + PAD, ly, line, F_BOLD, LABEL_SIZE, GOLD,
                     tracking=LABEL_TRACKING)
        ly -= LABEL_LEADING


def draw_card_row(c, y_top, items, n_cols):
    """Dessine une rangée de `n_cols` cards de largeur égale, hauteur uniforme.
    Retourne le nouveau curseur Y sous la rangée.
    """
    width = (CONTENT_W - (n_cols - 1) * GUTTER) / n_cols

    measured = []
    max_h = 0
    for item in items:
        h, desc_lines, offset, label_lines = measure_card(
            width, item["desc"], item["label"])
        measured.append((h, desc_lines, offset, label_lines))
        max_h = max(max_h, h)

    for i, item in enumerate(items):
        h, desc_lines, offset, label_lines = measured[i]
        x = MARGIN + i * (width + GUTTER)
        draw_card(c, x, y_top, width, max_h, item["badge"], item["title"],
                  desc_lines, offset, label_lines)

    return y_top - max_h - ROW_GAP


# ----------------------------------------------------------------------------
# Liste "essais & performances" (page 2)
# ----------------------------------------------------------------------------

ITEM_BADGE_R = 11
ITEM_TITLE_SIZE = 10.5
ITEM_DESC_SIZE = 9.2
ITEM_DESC_LEADING = 12.6
ITEM_GAP_BADGE_TITLE = 10
ITEM_ROW_PAD_Y = 12


def draw_test_item(c, x, y_top, width, number, title, desc):
    """Une ligne de résultat d'essai : badge rond 'OK' + titre + description
    (description alignée sous le titre, pas sous le badge)."""
    text_x_offset = ITEM_BADGE_R * 2 + ITEM_GAP_BADGE_TITLE
    text_w = width - text_x_offset
    desc_lines = wrap_text(desc, F_REG, ITEM_DESC_SIZE, text_w)

    cx_badge = x + ITEM_BADGE_R
    cy_badge = y_top - ITEM_BADGE_R
    c.saveState()
    c.setFillColor(GOLD)
    c.circle(cx_badge, cy_badge, ITEM_BADGE_R, stroke=0, fill=1)
    c.setFont(F_BOLD, 7.5)
    c.setFillColor(WHITE)
    w = stringWidth("OK", F_BOLD, 7.5)
    c.drawString(cx_badge - w / 2, cy_badge - 2.6, "OK")
    c.restoreState()

    text_x = x + text_x_offset
    title_y = cy_badge - ITEM_TITLE_SIZE * 0.35
    c.setFont(F_BOLD, ITEM_TITLE_SIZE)
    c.setFillColor(DARK)
    c.drawString(text_x, title_y, f"{number}. {title}")

    desc_top = y_top - max(ITEM_BADGE_R * 2, ITEM_TITLE_SIZE * 1.2) - 9
    c.setFont(F_REG, ITEM_DESC_SIZE)
    c.setFillColor(GRAY)
    yy = desc_top
    for line in desc_lines:
        c.drawString(text_x, yy, line)  # même X que le titre
        yy -= ITEM_DESC_LEADING

    content_h = max(ITEM_BADGE_R * 2, ITEM_TITLE_SIZE * 1.2) + 9 + \
        len(desc_lines) * ITEM_DESC_LEADING
    return y_top - content_h


# ----------------------------------------------------------------------------
# Contenu — Page 1
# ----------------------------------------------------------------------------

ISO_9001 = {
    "badge": "9001",
    "title": "ISO 9001:2015",
    "desc": "Système de management de la qualité certifié pour la "
            "production de plaques et vasques en pierre reconstituée. "
            "Validité : jusqu'en avril 2026.",
    "label": "MANAGEMENT DE LA QUALITÉ",
}
ISO_14001 = {
    "badge": "14001",
    "title": "ISO 14001:2015",
    "desc": "Système de management environnemental certifié, couvrant "
            "la production et les activités associées du site industriel. "
            "Validité : jusqu'en avril 2026.",
    "label": "MANAGEMENT ENVIRONNEMENTAL",
}
ISO_45001 = {
    "badge": "45001",
    "title": "ISO 45001:2018",
    "desc": "Système de management de la santé et de la sécurité au travail "
            "certifié, couvrant la production et les activités associées du "
            "site industriel. Validité : jusqu'en avril 2026.",
    "label": "SANTÉ & SÉCURITÉ AU TRAVAIL",
}
NSF_51 = {
    "badge": "NSF",
    "title": "NSF/ANSI 51",
    "desc": "Reconnaissance NSF International pour la conformité aux "
            "exigences applicables aux équipements en contact avec les "
            "aliments. Autorise l'usage de la marque NSF sur les produits "
            "listés.",
    "label": "CONTACT ALIMENTAIRE",
}
GREENGUARD = {
    "badge": "GG",
    "title": "GREENGUARD (UL 2818)",
    "desc": "Certification UL pour les faibles émissions chimiques dans les "
            "matériaux de construction, finitions et mobilier — un critère "
            "clé pour la santé, la petite enfance et les établissements de "
            "soins.",
    "label": "FAIBLES ÉMISSIONS CHIMIQUES",
}
CUPC = {
    "badge": "cUPC",
    "title": "cUPC — IAPMO Research and Testing",
    "desc": "Vasques certifiées conformes à l'Uniform Plumbing Code (UPC®) "
            "et au National Plumbing Code of Canada, selon la norme CSA "
            "B45.5-22 / IAPMO Z124-2022. Certificat valide jusqu'en "
            "juillet 2029.",
    "label": "NORME PLOMBERIE CSA / IAPMO",
}

# Chaque section est une liste de "rows" ; une row est une liste de 1 à 3
# cards dessinées côte à côte (largeur égale). Une row à un seul élément
# s'affiche en pleine largeur.
PAGE1_SECTIONS = [
    {
        "title": "SYSTÈME DE MANAGEMENT",
        "rows": [
            [ISO_9001, ISO_14001],
            [ISO_45001],
        ],
    },
    {
        "title": "SÉCURITÉ SANITAIRE & QUALITÉ DE L'AIR",
        "rows": [
            [NSF_51, GREENGUARD],
        ],
    },
    {
        "title": "CONFORMITÉ PRODUIT — SANITAIRES",
        "rows": [
            [CUPC],
        ],
    },
]

PAGE1_SUBTITLE = [
    "La qualité de nos matériaux solid surface, garantie par des",
    "organismes de certification indépendants.",
]

# ----------------------------------------------------------------------------
# Contenu — Page 2
# ----------------------------------------------------------------------------

PAGE2_SUBTITLE = [
    "Résultats de laboratoires indépendants (SGS, centres nationaux d'essais",
    "matériaux) sur nos plaques et vasques.",
]

TEST_ITEMS = [
    ("Sécurité chimique (RoHS)",
     "Plomb, mercure, cadmium, chrome hexavalent, PBB, PBDE et phtalates "
     "(DEHP, BBP, DBP, DIBP) non détectés sur les joints d'assemblage — "
     "conforme à la directive européenne RoHS (UE) 2015/863."),
    ("Dureté Barcol",
     "Résistance de surface conforme et supérieure aux seuils de la norme "
     "JC/T 908 (pierre reconstituée)."),
    ("Résistance aux chocs",
     "Bille d'acier de 450 g, hauteur d'impact ≥ 2000 mm sans dommage — "
     "classe A."),
    ("Résistance aux taches & produits chimiques",
     "Aucune altération visible après exposition prolongée à taches et "
     "agents chimiques courants."),
    ("Résistance thermique",
     "Aucune fissure, cloque ni décoloration après exposition à la chaleur "
     "et aux écarts de température."),
    ("Réaction au feu (ASTM E84)",
     "Indice de propagation de flamme 5 et indice de fumée 45 — Classe A "
     "(essai tunnel ASTM E84), la meilleure classification de la norme."),
    ("Radioactivité",
     "Indices de radioactivité conformes à la classe A (GB 6566) — sans "
     "risque pour l'usage intérieur."),
    ("Absorption d'eau / étanchéité",
     "Taux d'absorption d'eau très faible, adapté aux pièces humides "
     "(salle de bain, santé)."),
]

TEST_NOTE = ("Rapports d'essais réalisés par des laboratoires accrédités "
             "indépendants (SGS, centres nationaux d'inspection qualité des "
             "matériaux de construction). Copies disponibles sur demande.")


# ----------------------------------------------------------------------------
# Construction du PDF
# ----------------------------------------------------------------------------

def build(output_path):
    c = canvas.Canvas(output_path, pagesize=A4)
    c.setTitle("Certifications & Normes — Solid Surface Tunisie")
    c.setAuthor("Groupe Promacryl")

    # -------- Page 1 --------
    new_page(c)
    y = draw_header(c, "RESSOURCES", "Certifications & Normes", PAGE1_SUBTITLE)

    for section in PAGE1_SECTIONS:
        y = draw_section_title(c, y, section["title"])
        for row_items in section["rows"]:
            y = draw_card_row(c, y, row_items, len(row_items))
        y += ROW_GAP  # annule le gap de la dernière row
        y -= SECTION_GAP

    draw_footer(c, 1, 2)
    c.showPage()

    # -------- Page 2 --------
    new_page(c)
    y = draw_header(c, "RESSOURCES", "Essais & Performances", PAGE2_SUBTITLE)
    y = draw_section_title(c, y, "RÉSULTATS D'ESSAIS INDÉPENDANTS")

    # Card blanche englobant la liste des 8 essais
    row_h = []
    text_w = CONTENT_W - 2 * PAD - (ITEM_BADGE_R * 2 + ITEM_GAP_BADGE_TITLE)
    for title, desc in TEST_ITEMS:
        lines = wrap_text(desc, F_REG, ITEM_DESC_SIZE, text_w)
        h = max(ITEM_BADGE_R * 2, ITEM_TITLE_SIZE * 1.2) + 9 + \
            len(lines) * ITEM_DESC_LEADING
        row_h.append(h)

    divider_gap = 14
    card_h = PAD * 2 + sum(row_h) + divider_gap * (len(row_h) - 1)

    c.saveState()
    c.setFillColor(WHITE)
    c.setStrokeColor(BORDER)
    c.setLineWidth(1)
    c.roundRect(MARGIN, y - card_h, CONTENT_W, card_h, 8, stroke=1, fill=1)
    c.restoreState()

    yy = y - PAD
    for i, (title, desc) in enumerate(TEST_ITEMS):
        yy = draw_test_item(c, MARGIN + PAD, yy, CONTENT_W - 2 * PAD,
                             i + 1, title, desc)
        if i < len(TEST_ITEMS) - 1:
            rule_y = yy - divider_gap / 2
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.75)
            c.line(MARGIN + PAD, rule_y, MARGIN + CONTENT_W - PAD, rule_y)
            yy -= divider_gap

    y = y - card_h - 18

    note_lines = wrap_text(TEST_NOTE, F_ITAL, 8.5, CONTENT_W)
    c.setFont(F_ITAL, 8.5)
    c.setFillColor(GRAY)
    for line in note_lines:
        c.drawString(MARGIN, y, line)
        y -= 12

    draw_footer(c, 2, 2)
    c.showPage()

    c.save()


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else "certifications_normes.pdf"
    build(out)
    print(f"PDF généré : {os.path.abspath(out)}")
