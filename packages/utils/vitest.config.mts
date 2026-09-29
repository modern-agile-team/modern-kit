/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'node',
    setupFiles: './vitest.setup.mts',
    globals: false,
    pool: 'vmThreads',
    coverage: {
      provider: 'istanbul',
      exclude: [
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
