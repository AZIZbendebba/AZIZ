# Solid Surface Tunisie — Site vitrine premium

Site vitrine **Next.js 14** pour **Solid Surface Tunisie** et **Techno-Logika SA**.
Stack : Next.js 14 + TypeScript + Tailwind CSS + Framer Motion + Lenis.

---

## Installation

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Pour un futur branchement sur un CRM (Odoo ou autre)
NEXT_PUBLIC_SITE_URL=https://www.solid-surface-tunisie.com
ODOO_API_URL=           # URL de l'instance Odoo
ODOO_API_KEY=           # Clé API Odoo
```

---

## Structure des dossiers

```
app/                    Pages Next.js (App Router)
├── layout.tsx          Layout racine (Header, Footer, SEO, fonts)
├── page.tsx            Page d'accueil
├── le-groupe/          Page "Notre groupe"
├── savoir-faire/       Page "Savoir-faire"
├── secteurs/[secteur]/ Pages dynamiques secteurs
├── realisations/       Galerie filtrable
├── realisations/[slug] Fiches projet
├── contact/            Formulaire devis + coordonnées
├── mentions-legales/
├── politique-confidentialite/
├── sitemap.ts          Sitemap automatique
└── robots.ts

components/
├── layout/             Header, Footer, MobileMenu
├── sections/           Sections homepage
├── shared/             Logo, GoldDivider, SectionTitle
├── widgets/            WhatsAppFloat, ScrollIndicator
├── forms/              DevisForm (multi-étapes, Zod)
└── providers/          SmoothScrollProvider (Lenis)

lib/
├── data/               Données mock (realisations.ts, secteurs.ts, seo.ts)
├── fonts.ts            Cormorant Garamond + Inter
└── utils.ts            cn() helper

public/
├── logo-blanc.png      Logo sur fond sombre
├── logo-noir.png       Logo sur fond clair
└── images/             Photos de réalisations
```

---

## TODO — Suite du projet

### Contenu & Assets
- [ ] Remplacer les images Unsplash par les vraies photos du portfolio
- [ ] Photographier l'atelier pour la section "Le Groupe"
- [ ] Créer `public/og-image.jpg` (1200×630) pour Open Graph
- [ ] Compléter les informations légales (matricule fiscal, RC, hébergeur)
- [ ] Ajouter de vraies coordonnées showroom et intégrer Google Maps

### Fonctionnalités
- [ ] Brancher le formulaire de devis sur un endpoint réel (Odoo CRM ou email SMTP)
- [ ] Lightbox pour les images de projet (react-photoswipe-gallery ou similaire)
- [ ] Ajouter la vidéo de présentation en hero (remplacer l'image fixe)

### i18n
- [ ] Activer next-intl pour FR (défaut) + AR + EN
- [ ] Structure fichiers de traduction dans `/messages/{fr,ar,en}.json`
- [ ] Basculer les textes hardcodés vers des clés de traduction

### Intégration Odoo CRM
- [ ] Créer une API Route `/api/devis` qui pousse le formulaire vers Odoo via API REST
- [ ] Gérer la confirmation email automatique côté client

### SEO
- [ ] Générer `public/og-image.jpg` aux bonnes dimensions
- [ ] Vérifier la Search Console après mise en ligne
- [ ] Ajouter Schema.org `Product` pour les types de surfaces

### Performance
- [ ] Convertir les PNG en WebP (logo et images produit)
- [ ] Activer `next/image` avec `sizes` précis pour chaque usage
- [ ] Tester Lighthouse en production (cible 90+ tous axes)
