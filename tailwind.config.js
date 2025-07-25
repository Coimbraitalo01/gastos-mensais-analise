/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A4EFF",     
        dark: "#111827",        
        card: "#1F2937",        
        accent: "#3B82F6",      
        light: "#F9FAFB"        
      },
    },
  },
  plugins: [],
};