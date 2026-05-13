import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'noir-profond': '#0A0A0A',
        'noir-pur': '#000000',
        'or-champagne': '#C9A961',
        'or-clair': '#D4B776',
        'or-sombre': '#8B7340',
        'blanc-pur': '#FFFFFF',
        'blanc-creme': '#F5F2EC',
        'gris-fume': '#1A1A1A',
        'gris-texte': '#A8A8A8',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.25em',
        'wide-xl': '0.15em',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      borderRadius: {
        DEFAULT: '2px',
        'sm': '2px',
        'md': '4px',
        'lg': '4px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { height: '0' },
          '100%': { height: '100%' },
        },
        'scroll-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'scroll-bounce': 'scroll-bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
