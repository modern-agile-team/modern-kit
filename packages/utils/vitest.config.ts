/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import packageJson from './package.json';

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'istanbul',
      exclude: [
        'src/index.ts',
        'src/common/index.ts',
        'src/device/index.ts',
        'src/string/index.ts',
        'src/object/index.ts',
        'src/storage',
      ],
    },
  },
});
