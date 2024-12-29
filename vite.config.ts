/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/airports/': {
        target: 'https://qa.foreflight.com',
        changeOrigin: true,
        secure: true,
      },
      '/weather/': {
        target: 'https://qa.foreflight.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/setupTest.ts"],
  },
})
