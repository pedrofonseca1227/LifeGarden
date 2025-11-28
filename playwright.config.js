import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  testMatch: "**/*.e2e.js",
  testIgnore: [
    "**/*.test.js",      
    "**/*.spec.js",      
    "**/unit/**",
    "**/integration/**"
  ],
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    headless: false,
    slowMo: 2000,
    baseURL: "http://localhost:5173",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  }
});
