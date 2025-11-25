import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',

  // EVITA PLAYWRIGHT LER TESTES DO PROJETO INTEIRO
  testMatch: "**/tests/e2e/**/*.e2e.js",

  testIgnore: [
    "**/node_modules/**",
    "**/*.test.*",
    "**/*.spec.*",
    "**/tests/unit/**",
    "**/tests/integration/**",
    "**/tests/__mocks__/**"
  ],

  use: {
    headless: false,
    baseURL: "http://localhost:5173",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});
