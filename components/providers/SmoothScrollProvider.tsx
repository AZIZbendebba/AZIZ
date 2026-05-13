'use client'

import { useEffect } from 'react'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null
    let rafId: number

    async function initLenis() {
      const Lenis = (await import('lenis')).default
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis?.raf(time)
        rafId = requestAnimationFrame(raf)
      }

      rafId = requestAnimationFrame(raf)
    }

    initLenis()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [])

  return <>{children}</>
}
