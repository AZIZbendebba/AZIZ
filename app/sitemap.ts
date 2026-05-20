import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data/seo'
import { realisations } from '@/lib/data/realisations'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/cuisine`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/salle-de-bain`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/espace-sante`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/espace-bureautique`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/professionnels`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/espace-meuble`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/espace-meuble/cuisine`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/espace-meuble/dressing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/espace-meuble/meuble-salle-de-bain`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/realisations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const realisationRoutes: MetadataRoute.Sitemap = realisations.map((r) => ({
    url: `${base}/realisations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...realisationRoutes]
}
