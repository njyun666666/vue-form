/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
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
      }
    }
  },
  plugins: []
}
