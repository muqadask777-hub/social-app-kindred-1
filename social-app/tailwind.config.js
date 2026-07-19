/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eef4f0',
          100: '#d7e6dc',
          200: '#b0cdba',
          300: '#82ae91',
          400: '#579271',
          500: '#2D6A4F',
          600: '#255A42',
          700: '#1D4934',
          800: '#153627',
          900: '#0F2A1D',
        },
        amber: {
          400: '#EFD28C',
          500: '#E9C46A',
          600: '#CBA245',
        },
        paper: '#FBFAF6',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,24,31,0.05), 0 4px 16px rgba(20,24,31,0.05)',
      },
    },
  },
  plugins: [],
}
