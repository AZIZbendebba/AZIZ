'use client'

import { motion } from 'framer-motion'
import GoldDivider from './GoldDivider'
import { cn } from '@/lib/utils'

type SectionTitleProps = {
  overline?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  theme?: 'dark' | 'light'
  className?: string
}

export default function SectionTitle({
  overline,
  title,
  description,
  align = 'left',
  theme = 'dark',
  className,
}: SectionTitleProps) {
  const isCenter = align === 'center'
  const isLight = theme === 'light'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mb-16 lg:mb-20', isCenter && 'text-center', className)}
    >
      {overline && (
        <p className={cn('overline-text mb-6', isLight && 'text-or-champagne')}>
          {overline}
        </p>
      )}

      {!isCenter && !overline && (
        <GoldDivider variant="left" className="mb-8" />
      )}

      <h2
        className={cn(
          'font-cormorant font-light leading-tight',
          'text-4xl md:text-5xl lg:text-6xl',
          isLight ? 'text-noir-profond' : 'text-blanc-pur',
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            'mt-6 font-inter font-light leading-relaxed max-w-2xl text-base md:text-lg',
            isLight ? 'text-gris-fume' : 'text-gris-texte',
            isCenter && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
