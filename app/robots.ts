import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/data/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mentions-legales', '/politique-confidentialite'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
