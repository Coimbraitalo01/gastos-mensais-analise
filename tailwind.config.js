module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corporate: {
          blue: '#1D4ED8',
          light: '#F8FAFC',
          dark: '#0F172A'
        }
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}