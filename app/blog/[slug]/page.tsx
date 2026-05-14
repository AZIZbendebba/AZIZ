import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import GoldDivider from '@/components/shared/GoldDivider'
import { articles, getArticleBySlug } from '@/lib/data/articles'
import { siteConfig } from '@/lib/data/seo'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: `${article.titre} — Solid Surface Tunisie`,
    description: article.resume,
    alternates: { canonical: `${siteConfig.url}/blog/${article.slug}` },
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function renderContent(content: string) {
  const paragraphs = content.split('\n\n')
  return paragraphs.map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="font-cormorant font-light text-blanc-pur text-2xl mt-10 mb-4">
          {block.replace('## ', '')}
        </h2>
      )
    }
    if (block.startsWith('**') && block.endsWith('**')) {
      return (
        <p key={i} className="font-inter font-medium text-blanc-pur/80 text-sm leading-relaxed mb-4">
          {block.replace(/\*\*/g, '')}
        </p>
      )
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '))
      return (
        <ul key={i} className="space-y-2 mb-6 ml-4">
          {items.map((item, j) => (
            <li key={j} className="font-inter font-light text-sm text-gris-texte flex items-start gap-2">
              <span className="text-or-champagne mt-1">—</span>
              <span>{item.replace('- ', '')}</span>
            </li>
          ))}
        </ul>
      )
    }
    return (
      <p key={i} className="font-inter font-light text-sm text-gris-texte leading-relaxed mb-6">
        {block}
      </p>
    )
  })
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const autresArticles = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 bg-noir-profond">
        <div className="container-site max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 font-inter text-xs tracking-[0.12em] uppercase text-gris-texte hover:text-or-champagne transition-colors mb-10">
            <ArrowLeft size={12} strokeWidth={1.5} />
            Retour au blog
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne border border-or-champagne/40 px-3 py-1">
              {article.categorie}
            </span>
            <span className="flex items-center gap-1.5 font-inter font-light text-xs text-gris-texte/60">
              <Clock size={11} strokeWidth={1.5} />
              {article.tempsLecture} de lecture
            </span>
          </div>

          <h1
            className="font-cormorant font-light text-blanc-pur mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            {article.titre}
          </h1>

          <p className="font-inter font-light text-base text-gris-texte leading-relaxed mb-4">
            {article.resume}
          </p>

          <p className="font-inter font-light text-xs text-gris-texte/50">
            Publié le {formatDate(article.date)}
          </p>
        </div>
      </section>

      <GoldDivider />

      {/* Contenu */}
      <article className="py-16 bg-noir-profond">
        <div className="container-site max-w-3xl">
          <div className="prose-solid">
            {renderContent(article.contenu)}
          </div>
        </div>
      </article>

      <GoldDivider />

      {/* CTA */}
      <section className="py-16 bg-gris-fume">
        <div className="container-site max-w-2xl mx-auto text-center">
          <p className="overline-text mb-4">Votre projet</p>
          <h2 className="font-cormorant font-light text-blanc-pur text-3xl mb-6">
            Prêt à démarrer votre projet ?
          </h2>
          <p className="font-inter font-light text-sm text-gris-texte leading-relaxed mb-8">
            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé.
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            Demander un devis gratuit
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* Autres articles */}
      {autresArticles.length > 0 && (
        <section className="py-16 bg-noir-profond">
          <div className="container-site">
            <p className="overline-text mb-8">À lire aussi</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {autresArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="group border border-gris-fume hover:border-or-champagne/50 transition-colors duration-300 p-8"
                >
                  <span className="font-inter text-[0.6rem] tracking-[0.15em] uppercase text-or-champagne">
                    {a.categorie}
                  </span>
                  <h3 className="font-cormorant font-light text-blanc-pur text-xl mt-3 mb-3 group-hover:text-or-champagne transition-colors">
                    {a.titre}
                  </h3>
                  <p className="font-inter font-light text-xs text-gris-texte leading-relaxed">
                    {a.resume}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
