import { defineConfig } from 'vite'

export default defineConfig({
  base: '/cbdb_agent/', // This should match your GitHub repository name
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true
  }
})
