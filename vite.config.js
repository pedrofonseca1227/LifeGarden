import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",

    include: ["tests/unit/**/*.test.js", "tests/integration/**/*.test.js"],
    exclude: [
      "node_modules/**",
      "dist/**",
      "tests/e2e/**",
      "playwright.config.js"
    ],

    coverage: {
      provider: 'v8',          
      reporter: ['lcov', 'text', 'json', 'html'],
      reportsDirectory: './coverage',
      exclude: [
      "src/services/messageService.js",
      "src/services/productService.js",
      "src/services/userService.js",
    ],
    }
  }
})
