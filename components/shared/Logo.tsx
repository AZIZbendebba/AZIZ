import Image from 'next/image'
import Link from 'next/link'

type LogoProps = {
  variant?: 'blanc' | 'noir'
  className?: string
}

export default function Logo({ variant = 'blanc', className = '' }: LogoProps) {
  const src = variant === 'blanc' ? '/logo-blanc.png' : '/logo-noir.png'

  return (
    <Link href="/" className={`inline-flex items-center ${className}`} aria-label="Solid Surface Tunisie — Accueil">
      <Image
        src={src}
        alt="Solid Surface Tunisie"
        width={280}
        height={80}
        priority
        className="w-auto h-12 md:h-14 object-contain"
      />
    </Link>
  )
}
