'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { realisations, universDisponibles, secteursDisponibles } from '@/lib/data/realisations'
import GoldDivider from '@/components/shared/GoldDivider'

const ALL = 'Tous'

export default function RealisationsPage() {
  const [activeUnivers, setActiveUnivers] = useState(ALL)
  const [activeSecteur, setActiveSecteur] = useState(ALL)

  const universFilters = [ALL, ...universDisponibles]
  const secteurFilters = [ALL, ...secteursDisponibles]

  const filtered = useMemo(() => {
    return realisations.filter((r) => {
      const matchUnivers = activeUnivers === ALL || r.univers === activeUnivers
      const matchSecteur = activeSecteur === ALL || r.secteur === activeSecteur
      return matchUnivers && matchSecteur
    })
  }, [activeUnivers, activeSecteur])

  return (
    <>
      {/* Header */}
      <section className="pt-40 pb-16 bg-noir-profond">
        <div className="container-site">
          <p className="overline-text mb-6">Galerie</p>
          <h1
            className="font-cormorant font-light text-blanc-pur mb-8"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Toutes nos
            <br />
            <span className="text-or-champagne">réalisations.</span>
          </h1>
          <GoldDivider className="mb-10" />

          {/* Filtre univers */}
          <div className="mb-4">
            <p className="font-inter text-[0.55rem] tracking-[0.15em] uppercase text-gris-texte/50 mb-3">
              Univers
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {universFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveUnivers(f)}
                  className={`font-inter text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
                    activeUnivers === f
                      ? 'border-or-champagne text-or-champagne bg-or-champagne/5'
                      : 'border-gris-fume text-gris-texte hover:border-gris-texte'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Filtre secteur */}
          <div className="mt-4">
            <p className="font-inter text-[0.55rem] tracking-[0.15em] uppercase text-gris-texte/50 mb-3">
              Secteur
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {secteurFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveSecteur(f)}
                  className={`font-inter text-[0.6rem] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
                    activeSecteur === f
                      ? 'border-or-champagne text-or-champagne bg-or-champagne/5'
                      : 'border-gris-fume text-gris-texte hover:border-gris-texte'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24 bg-noir-profond">
        <div className="container-site">
          <LayoutGroup>
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filtered.map((r) => (
                  <motion.div
                    key={r.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/realisations/${r.slug}`} className="group relative block overflow-hidden bg-gris-fume h-72 md:h-80">
                      <Image
                        src={r.imageHero}
                        alt={r.titre}
                        fill
                        className="object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-noir-profond/85 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="overline-text mb-2 text-or-champagne/60">{r.univers} — {r.annee}</p>
                        <h2 className="font-cormorant font-light text-blanc-pur text-xl group-hover:text-or-champagne transition-colors duration-300">
                          {r.titre}
                        </h2>
                        <p className="font-inter font-light text-xs text-gris-texte mt-1">{r.lieu}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-cormorant font-light text-gris-texte text-2xl">
                Aucune réalisation pour cette sélection.
              </p>
              <button
                onClick={() => { setActiveUnivers(ALL); setActiveSecteur(ALL) }}
                className="btn-ghost mt-6 inline-flex"
              >
                Voir toutes les réalisations
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
