/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'jsdom',
    globals: false,
    setupFiles: './vitest.setup.mts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        'src/utils/**',
        'src/_internal/**',
        'src/**/internal.ts',
        'src/**/*.utils.ts',
        'src/hooks/useClipboard',
        'src/hooks/useResizeObserver',
        'build.utils.mjs',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
});
