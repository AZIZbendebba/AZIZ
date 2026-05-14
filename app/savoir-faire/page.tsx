import type { Metadata } from 'next'
import Image from 'next/image'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Savoir-faire — Solid Surface Tunisie',
  description:
    'Surfaces Solid Surface et mobilier sur mesure fabriqués sous le même toit à Tunis. Découvrez nos deux savoir-faire et notre process intégré.',
}

const finitions = [
  { nom: 'Mat satiné', desc: 'Surface douce au toucher, anti-traces, idéale pour les plans de travail.' },
  { nom: 'Poli brillant', desc: 'Aspect miroir, profond, met en valeur les coloris intenses.' },
  { nom: 'Grainé fin', desc: 'Texture légèrement texturée, résistante aux rayures légères.' },
  { nom: 'Thermoformé', desc: 'Surfaces courbes, vasques intégrées, formes organiques sans joint.' },
]

const mobilierCategories = [
  ['Cuisines', 'Caissons MDF ou contre-plaqué bouleau, façades laquées ou plaquées.'],
  ['Salles de bain', 'Meubles vasques, colonnes, miroirs et caissons miroir intégrés.'],
  ['Dressings & rangements', 'Systèmes portants sur mesure, quincaillerie Blum/Hettich.'],
  ['Bureau & bibliothèques', 'Mobilier de direction, rayonnages sur mesure.'],
  ['Mobilier médical', 'Caissons médicaux, mobilier de cabinet dentaire, laboratoires.'],
]

const etapes = [
  {
    num: '01',
    titre: 'Design',
    texte: 'Conception sur mesure avec votre architecte ou notre bureau d\'études. Nous modélisons surfaces et mobilier ensemble pour garantir une cohérence parfaite dès le départ.',
  },
  {
    num: '02',
    titre: 'Atelier',
    texte: 'Fabrication intégrée à Tunis. Nos équipes façonnent les surfaces Solid Surface et le mobilier sous le même toit — caissons, façades, îlots, dressings, rangements.',
  },
  {
    num: '03',
    titre: 'Pose',
    texte: 'Installation par nos équipes, sans sous-traitance. Délais maîtrisés, qualité garantie, finitions soignées. Un seul interlocuteur du début à la fin.',
  },
]

export default function SavoirFairePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/plan-travail-beige.jpg"
          alt="Détail surface Corian — savoir-faire Solid Surface Tunisie"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <p className="overline-text mb-4">Savoir-faire</p>
          <h1
            className="font-cormorant font-light text-blanc-pur"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            Deux maîtrises,
            <br />
            <span className="text-or-champagne">une seule offre intégrée.</span>
          </h1>
        </div>
      </section>

      {/* Section 1 — Solid Surface */}
      <section id="solid-surface" className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                overline="Savoir-faire 01 — La matière"
                title="Solid Surface —&#10;la surface sans compromis."
                description="Le Solid Surface (Corian® DuPont™) est une matière minérale et résine acrylique, homogène dans toute son épaisseur. Nous la travaillons comme un artisan travaille la pierre — avec patience, précision, et la conviction que chaque millimètre compte."
              />
              <div className="space-y-6 mt-8">
                {finitions.map((f) => (
                  <div key={f.nom} className="flex gap-4">
                    <GoldDivider variant="vertical" className="self-stretch opacity-50" />
                    <div>
                      <h3 className="font-cormorant text-blanc-pur text-xl mb-1">{f.nom}</h3>
                      <p className="font-inter font-light text-sm text-gris-texte">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['/images/cuisine-blanc-vene.jpg', '/images/plan-travail-beige.jpg', '/images/corian-detail.jpg', '/images/cuisine-ilot.jpg'].map((src, i) => (
                <div key={i} className={`overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'}`}>
                  <Image src={src} alt={`Finition Corian ${i + 1}`} width={600} height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Section 2 — Mobilier */}
      <section id="mobilier" className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden order-last lg:order-first">
              <Image
                src="/images/cuisine-hachicha.jpg"
                alt="Mobilier sur mesure Solid Surface Tunisie"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
            <div>
              <SectionTitle
                overline="Savoir-faire 02 — Le mobilier"
                title="Menuiserie d'agencement —&#10;le mobilier qui accompagne."
                description="Notre atelier de menuiserie conçoit et fabrique tout le mobilier qui accompagne nos surfaces. Caissons, façades, dressings, bibliothèques, mobilier médical — chaque meuble est conçu pour s'articuler parfaitement avec les surfaces que nous fabriquons. Pas de sous-traitance, tout est réalisé par nos équipes."
              />
              <div className="space-y-5 mt-6">
                {mobilierCategories.map(([titre, desc]) => (
                  <div key={titre} className="border-b border-gris-fume/30 pb-5">
                    <h3 className="font-cormorant font-light text-blanc-pur text-xl mb-1">{titre}</h3>
                    <p className="font-inter font-light text-sm text-gris-texte">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="font-inter font-light text-xs text-gris-texte/60 mt-6 leading-relaxed">
                Essences : mélaminé premium, MDF laqué, placage bois noble (chêne, noyer), métal sur demande.<br />
                Quincaillerie : Blum, Hettich, Häfele — uniquement des marques premium.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider />

      {/* Section 3 — Process intégré */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="max-w-2xl mb-16">
            <SectionTitle
              overline="Savoir-faire 03 — Le process"
              title="Un seul interlocuteur,&#10;du dessin à la pose."
              description="De la première esquisse à la dernière passe de ponçage, vous n'avez qu'un seul contact. Pas de coordination à gérer entre un menuisier et un poseur. Pas de blanc entre la surface et le meuble. Juste un projet, une équipe, un résultat."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gris-fume/20">
            {etapes.map((e) => (
              <div key={e.num} className="bg-noir-profond p-10 lg:p-12 border border-gris-fume/20">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-cormorant text-or-champagne/60 text-5xl font-light leading-none">
                    {e.num}
                  </span>
                  <GoldDivider variant="vertical" className="h-8 opacity-30" />
                  <p className="font-inter text-[0.6rem] tracking-[0.2em] uppercase text-or-champagne">
                    {e.titre}
                  </p>
                </div>
                <p className="font-inter font-light text-sm text-gris-texte leading-relaxed">
                  {e.texte}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
