import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data/seo'
import { secteurs } from '@/lib/data/secteurs'
import { realisations } from '@/lib/data/realisations'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/le-groupe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/savoir-faire`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/realisations`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  const secteurRoutes: MetadataRoute.Sitemap = secteurs.map((s) => ({
    url: `${base}/secteurs/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const realisationRoutes: MetadataRoute.Sitemap = realisations.map((r) => ({
    url: `${base}/realisations/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...secteurRoutes, ...realisationRoutes]
}
