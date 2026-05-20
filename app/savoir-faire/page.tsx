import type { Metadata } from 'next'
import Image from 'next/image'
import GoldDivider from '@/components/shared/GoldDivider'
import SectionTitle from '@/components/shared/SectionTitle'
import ContactCTA from '@/components/sections/ContactCTA'

export const metadata: Metadata = {
  title: 'Savoir-faire',
  description:
    'La matière Solid Surface Corian®, le mobilier sur mesure, le process intégral , découvrez le savoir-faire de Solid Surface Tunisie.',
}

const finitions = [
  { nom: 'Mat satiné', desc: 'Surface douce au toucher, anti-traces, idéale pour les plans de travail.' },
  { nom: 'Poli brillant', desc: 'Aspect miroir, profond, met en valeur les coloris intenses.' },
  { nom: 'Grainé fin', desc: 'Texture légèrement texturée, résistante aux rayures légères.' },
  { nom: 'Thermoformé', desc: 'Surfaces courbes, vasques intégrées, formes organiques sans joint.' },
]

export default function SavoirFairePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden bg-noir-profond flex items-end">
        <Image
          src="/images/plan-travail-beige.jpg"
          alt="Détail surface Corian , savoir-faire Solid Surface Tunisie"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir-profond to-transparent" />
        <div className="relative z-10 container-site pb-16">
          <p className="overline-text mb-4">Savoir-faire</p>
          <h1
            className="font-serif font-light text-blanc-pur"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
          >
            La maîtrise de la matière,
            <br />
            <span className="text-or-champagne">de A à Z.</span>
          </h1>
        </div>
      </section>

      {/* Solid Surface */}
      <section id="solid-surface" className="section-padding bg-noir-profond">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle
                overline="Solid Surface Tunisie"
                title="La surface sans compromis."
                description="Le Solid Surface est une matière minérale et résine acrylique, homogène dans toute son épaisseur. Nous la travaillons comme un artisan travaille la pierre , avec patience, précision, et la conviction que chaque millimètre compte."
              />
              <div className="space-y-6 mt-8">
                {finitions.map((f) => (
                  <div key={f.nom} className="flex gap-4">
                    <GoldDivider variant="vertical" className="self-stretch opacity-50" />
                    <div>
                      <h3 className="font-serif text-blanc-pur text-xl mb-1">{f.nom}</h3>
                      <p className="font-sans font-light text-sm text-blanc-pur/60">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['/images/cuisine-blanc-vene.jpg', '/images/plan-travail-beige.jpg', '/images/corian-detail.jpg', '/images/cuisine-ilot.jpg'].map((src, i) => (
                <div key={i} className={`overflow-hidden ${i === 0 ? 'col-span-2 aspect-[16/7]' : 'aspect-square'}`}>
                  <Image src={src} alt={`Finition Corian ${i + 1}`} width={600} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobilier */}
      <section id="mobilier" className="section-padding bg-blanc-creme">
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
                overline="Solid Surface Tunisie"
                title="Le mobilier. L'agencement complet."
                description="Notre atelier de menuiserie conçoit et fabrique chaque meuble en dialogue direct avec les surfaces Solid Surface , pour un ensemble qui respire la cohérence."
                theme="light"
              />
              <div className="space-y-5 mt-6">
                {[
                  ['Cuisines', 'Caissons MDF ou contre-plaqué bouleau, façades laquées ou plaquées.'],
                  ['Salles de bain', 'Meubles vasques, colonnes, miroirs intégrés.'],
                  ['Dressings & rangements', 'Systèmes portants sur mesure, éclairage LED intégré.'],
                  ['Bureau & bibliothèques', 'Mobilier de direction, rayonnages sur mesure.'],
                  ['Mobilier hôtelier', 'Têtes de lit, bureaux de chambre, meubles TV, en série personnalisée.'],
                ].map(([titre, desc]) => (
                  <div key={titre} className="border-b border-noir-profond/10 pb-5">
                    <h3 className="font-serif font-light text-noir-profond text-xl mb-1">{titre}</h3>
                    <p className="font-sans font-light text-sm text-gris-fume/70">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process rapide */}
      <section className="section-padding bg-noir-profond">
        <div className="container-site text-center max-w-3xl mx-auto">
          <GoldDivider variant="center" className="mb-12" />
          <p className="overline-text mb-6">Notre force</p>
          <h2 className="font-serif font-light text-blanc-pur mb-8" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Un seul interlocuteur pour toute la chaîne.
          </h2>
          <p className="font-sans font-light text-blanc-pur/60 leading-relaxed mb-12">
            De la première esquisse à la dernière passe de ponçage, vous n&apos;avez
            qu&apos;un seul contact. Pas de coordination à gérer entre un menuisier
            et un poseur. Pas de blanc entre la surface et le meuble. Juste un projet,
            une équipe, un résultat.
          </p>
          <GoldDivider variant="center" />
        </div>
      </section>

      <ContactCTA />
    </>
  )
}
