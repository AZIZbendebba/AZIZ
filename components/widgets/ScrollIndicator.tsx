'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span className="font-inter text-[0.55rem] tracking-[0.2em] uppercase text-gris-texte">
        Défiler
      </span>
      <div className="w-px h-12 bg-gris-fume overflow-hidden relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-or-champagne"
          initial={{ height: '0%', top: '0%' }}
          animate={{ height: '40%', top: '100%' }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  )
}
