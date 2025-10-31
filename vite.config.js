import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // ensures Vercel knows where to look
  },
  base: './', // important for Vercel deployment (fixes blank page issues)
})
