/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
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
        'src/**/internal.ts',
        'src/**/*.bench.ts',
        'src/**/*.utils.ts',
        'build.utils.mjs',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
