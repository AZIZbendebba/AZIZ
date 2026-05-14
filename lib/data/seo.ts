export const siteConfig = {
  name: 'Solid Surface Tunisie',
  url: 'https://www.solid-surface-tunisie.com',
  baseline: 'L\'émotion d\'une surface, la puissance d\'une création',
  description:
    'Conception, fabrication et installation sur mesure de surfaces Solid Surface et mobilier d\'exception pour cuisines, salles de bain et espaces professionnels en Tunisie.',
  address: {
    street: 'Résidence Tej Ezzahra, Bureau n°2.5, Avenue Fattouma Bourguiba',
    city: 'La Soukra, Tunis',
    country: 'Tunisie',
    phone: '+216 99 635 309',
    phone2: '+216 98 401 512',
    email: 'gestcom@promacryl.tn',
    whatsapp: '21699635309',
  },
  hours: 'Lun–Ven : 8h30–18h00 · Sam : 8h00–14h00',
  social: {
    instagram: 'https://instagram.com/solidsurfacetunisie',
    linkedin: 'https://linkedin.com/company/solid-surface-tunisie',
    facebook: 'https://facebook.com/solidsurfacetunisie',
  },
}

export const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.address.phone,
  email: siteConfig.address.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressCountry: 'TN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '14:00',
    },
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook],
}
