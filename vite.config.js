import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",

    // GARANTE que o Vitest NÃO rode testes E2E
    include: ["tests/unit/**/*.test.js", "tests/integration/**/*.test.js"],

    // Impede que Vitest tente carregar arquivos E2E ou configs do Playwright
    exclude: [
      "node_modules/**",
      "dist/**",
      "tests/e2e/**",
      "playwright.config.js"
    ],
  }
})
