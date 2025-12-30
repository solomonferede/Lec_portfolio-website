/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefaff',
          100: '#d9f1ff',
          200: '#b6e5ff',
          300: '#82d4ff',
          400: '#3fbbff',
          500: '#109cff',
          600: '#007bff',
          700: '#0062d1',
          800: '#0652a1',
          900: '#0a467f',
        },
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(0,0,0,0.25)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}


