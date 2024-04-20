/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    dir: './src',
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'istanbul',
    },
  },
});
