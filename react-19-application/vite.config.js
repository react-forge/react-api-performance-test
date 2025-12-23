import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    // Treemap visualization
    visualizer({
      filename: './dist/stats-treemap.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
    // JSON data for custom table
    visualizer({
      filename: './dist/stats.json',
      open: false,
      gzipSize: true,
      brotliSize: true,
      template: 'raw-data',
      projectRoot: process.cwd(),
    })
  ],
  server: {
    port: 5173
  }
})
