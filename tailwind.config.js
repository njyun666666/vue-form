import * as primeui from 'tailwindcss-primeui'
import * as colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        mask: 'hsl(var(--mask))',
        surface: {
          DEFAULT: 'var(--surface)',
          ...colors.neutral
        },
        color: 'var(--p-text-color)',
        error: {
          DEFAULT: 'hsl(var(--error))',
          ...colors.red
        }
      },
      fontSize: {
        '2xs': '0.625rem',
        '3xs': '0.5rem'
      },
      spacing: {
        9.5: '2.375rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        128: '32rem',
        144: '36rem'
      },
      minHeight: {
        5: '1.25rem'
      },
      animationDuration: {
        450: '450ms'
      }
    }
  },
  plugins: [primeui]
}
