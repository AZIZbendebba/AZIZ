export const siteConfig = {
  name: 'Solid Surface Tunisie',
  url: 'https://www.solid-surface-tunisie.com',
  baseline: "L'émotion d'une surface, la puissance d'une création",
  description:
    "Fabrication sur mesure de surfaces Solid Surface et Corian® ainsi que de mobilier de cuisine, dressing et salle de bain en Tunisie. 15 ans d'expérience, 500 projets réalisés.",
  address: {
    street: "Résidence Tej Ezzahra, Bureau n°2.5, Avenue Fattouma Bourguiba",
    city: 'La Soukra, Tunis',
    country: 'Tunisie',
    phone: '+216 99 635 309',
    phoneHref: 'tel:+21699635309',
    emails: {
      admin: 'admin@promacryl.tn',
      com: 'gestcom@promacryl.tn',
    },
    whatsapp: '+21699635309',
  },
  hours: 'Lundi au vendredi : 8h30 à 18h00',
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
  email: siteConfig.address.emails.admin,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: 'La Soukra',
    addressRegion: 'Tunis',
    postalCode: '2036',
    addressCountry: 'TN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '36.8825',
    longitude: '10.1927',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:30',
      closes: '18:00',
    },
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook],
  priceRange: '$$',
}
