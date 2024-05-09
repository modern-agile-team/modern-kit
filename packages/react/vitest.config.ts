/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
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
        'src/index.ts',
        'src/global.d.ts',
        'src/components/index.ts',
        'src/hooks/index.ts',
        'src/utils/test/**',
      ],
    },
  },
});
