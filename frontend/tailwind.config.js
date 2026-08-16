/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        keya: {
          navy: '#0B192C',
          dark: '#1E3E62',
          blue: '#1E56A0',
          accent: '#008DDA',
          emerald: '#059669',
          gold: '#D97706',
          light: '#F8FAFC',
          card: '#F1F5F9'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
