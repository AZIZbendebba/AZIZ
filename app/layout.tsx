import type { Metadata } from 'next'
import './globals.css'
import { cormorant, jost } from '@/lib/fonts'
import { siteConfig, jsonLdLocalBusiness } from '@/lib/data/seo'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/widgets/WhatsAppFloat'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} , ${siteConfig.baseline}`,
    template: `%s , ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'solid surface tunisie',
    'corian tunisie',
    'corian tunis',
    'plan de travail corian',
    'plan vasque solid surface',
    'credence cuisine sur mesure',
    'vasque moulee',
    'meuble sur mesure tunisie',
    'cuisine sur mesure tunis',
    'dressing sur mesure',
    'comptoir reception corian',
    'alternative marbre tunisie',
    'solid surface vs granit',
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'fr_TN',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} , ${siteConfig.baseline}`,
    description: siteConfig.description,
    images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} , ${siteConfig.baseline}`,
    description: siteConfig.description,
    images: ['/og/default.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdLocalBusiness) }}
        />
      </head>
      <body className="bg-noir-profond text-blanc-pur antialiased">
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
