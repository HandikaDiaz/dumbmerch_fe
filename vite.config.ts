import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      "@":"/src",
      '@components': './src/components',
      '@features': './src/features',
      '@hooks': './src/hooks',
      '@routers': './src/routers',
      '@utils': './src/utils',
    },
  }
})
