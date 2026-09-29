/// <reference types="vitest" />
import { coverageConfigDefaults, defineConfig } from 'vitest/config';
import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'happy-dom',
    globals: false,
    setupFiles: './vitest.setup.mts',
    pool: 'vmForks',
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
