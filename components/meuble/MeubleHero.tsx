'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

type MeubleHeroProps = {
  overline: string
  titre: ReactNode
  image: string
  imageAlt: string
}

export default function MeubleHero({ overline, titre, image, imageAlt }: MeubleHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[480px] overflow-hidden bg-noir-profond flex items-end">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-noir-profond via-noir-profond/50 to-transparent" />
      <div className="relative z-10 container-site pb-16">
        <p className="overline-text mb-4">{overline}</p>
        <h1
          className="font-cormorant font-light text-blanc-pur"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1 }}
        >
          {titre}
        </h1>
      </div>
    </section>
  )
}
