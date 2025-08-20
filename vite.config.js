import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gastos-mensais-analise/',
  build: {
    outDir: 'docs', 
    emptyOutDir: true
  }
})