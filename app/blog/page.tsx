import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'
import { articles } from '@/lib/data/articles'

export const metadata: Metadata = {
  title: 'Blog — Solid Surface Tunisie',
  description:
    'Conseils, guides et inspirations autour du Solid Surface — entretien, choix de matériaux, tendances cuisines et salles de bain.',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function BlogPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 bg-noir-profond">
        <div className="container-site">
          <p className="overline-text mb-6">Blog</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Conseils & inspirations
            <br />
            <span className="text-or-champagne">Solid Surface.</span>
          </h1>
          <p className="font-inter font-light text-gris-texte max-w-xl leading-relaxed">
            Guides pratiques, comparatifs de matériaux et inspirations pour vos projets
            de cuisine, salle de bain et espaces professionnels.
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* Articles grid */}
      <section className="pb-24 pt-16 bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group border border-gris-fume hover:border-or-champagne/50 transition-colors duration-300 flex flex-col"
              >
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne border border-or-champagne/40 px-3 py-1">
                      {article.categorie}
                    </span>
                    <span className="font-inter font-light text-xs text-gris-texte/60">
                      {article.tempsLecture} de lecture
                    </span>
                  </div>

                  <h2 className="font-cormorant font-light text-blanc-pur text-2xl leading-snug mb-4 group-hover:text-or-champagne transition-colors duration-300">
                    {article.titre}
                  </h2>

                  <p className="font-inter font-light text-sm text-gris-texte leading-relaxed flex-1 mb-6">
                    {article.resume}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="font-inter font-light text-xs text-gris-texte/50">
                      {formatDate(article.date)}
                    </p>
                    <div className="flex items-center gap-2 text-or-champagne opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-inter text-[0.6rem] tracking-[0.12em] uppercase">Lire</span>
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <GoldDivider className="opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
