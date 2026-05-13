export const siteConfig = {
  name: 'Solid Surface Tunisie',
  url: 'https://www.solid-surface-tunisie.com',
  baseline: 'L\'émotion d\'une surface, la puissance d\'une création',
  description:
    'Conception, fabrication et installation sur mesure de surfaces solides Corian et de mobilier d\'exception pour la maison, l\'hôtellerie et l\'institutionnel en Tunisie.',
  address: {
    street: 'Zone industrielle, Rue des Artisans',
    city: 'Tunis',
    country: 'Tunisie',
    phone: '+216 71 000 000',
    email: 'contact@solid-surface-tunisie.com',
    whatsapp: '+21671000000',
  },
  hours: 'Lundi – Vendredi : 8h30 – 18h00 | Samedi : 9h00 – 13h00',
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
      opens: '09:00',
      closes: '13:00',
    },
  ],
  sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.facebook],
}
