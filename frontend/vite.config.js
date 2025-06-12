import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    open: '/',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-chatbot-kit'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
