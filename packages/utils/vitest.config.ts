/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    globals: true,
    coverage: {
      provider: 'istanbul',
      exclude: [
        'src/storage',
        'src/clipboard',
        'src/file',
        'src/**/*.bench.ts',
      ],
    },
  },
});
