/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import packageJson from './package.json' with { type: 'json' };

export default defineConfig({
  test: {
    name: packageJson.name,
    dir: './src',
    globals: false,
  },
});
