import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#2D5016',
        secondary: '#7CB342',
        accent:    '#F4A300',
        earth:     '#8B5E3C',
        cream:     '#FAF6ED',
        muted:     '#6B7280',
        border:    '#E5E0D4',
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'card':    '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'nav':     '0 2px 20px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        'xl':  '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      screens: {
        'xs': '375px',
      },
      animation: {
        'fade-up':   'fadeUp 0.5s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'count-up':  'countUp 1s ease forwards',
        'shimmer':   'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
