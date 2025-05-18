import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    headless: false,
    baseURL: 'https://localhost:5173/',
    ignoreHTTPSErrors: true
  }
});
