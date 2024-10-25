/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        'src/utils/test/**',
        'src/**/internal.ts',
        'src/**/*.utils.ts',
        'src/hooks/useClipboard',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
