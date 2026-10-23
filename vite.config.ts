import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Keep the initial bundle lean for fast first paint.
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
  },
})
