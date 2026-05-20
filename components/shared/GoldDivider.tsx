import { cn } from '@/lib/utils'

type GoldDividerProps = {
  className?: string
  variant?: 'full' | 'left' | 'center' | 'vertical'
  height?: string
}

export default function GoldDivider({ className, variant = 'full', height = 'h-px' }: GoldDividerProps) {
  if (variant === 'vertical') {
    return (
      <div
        className={cn('w-px bg-or-champagne opacity-60', className)}
        style={{ background: 'linear-gradient(180deg, transparent 0%, #C9A84C 30%, #C9A84C 70%, transparent 100%)' }}
        aria-hidden="true"
      />
    )
  }

  if (variant === 'left') {
    return (
      <div
        className={cn('w-16 bg-or-champagne', height, className)}
        aria-hidden="true"
      />
    )
  }

  if (variant === 'center') {
    return (
      <div className={cn('flex items-center justify-center', className)} aria-hidden="true">
        <div className={cn('w-16 bg-or-champagne', height)} />
      </div>
    )
  }

  return (
    <div
      className={cn('w-full', height, className)}
      style={{
        background: 'linear-gradient(90deg, transparent 0%, #8B7340 20%, #C9A84C 50%, #8B7340 80%, transparent 100%)',
      }}
      aria-hidden="true"
    />
  )
}
