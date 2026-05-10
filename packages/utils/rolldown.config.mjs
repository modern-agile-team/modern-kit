import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import { createInput, formatEntry } from '../../scripts/build.utils.mjs';

const CATEGORY_LIST = [
  'array',
  'clipboard',
  'common',
  'date',
  'device',
  'file',
  'formatter',
  'math',
  'number',
  'object',
  'regex',
  'storage',
  'string',
  'style',
  'validator',
];

const input = createInput(CATEGORY_LIST);

const sharedOutput = {
  dir: './dist',
  preserveModules: true,
  preserveModulesRoot: 'src',
  sourcemap: true,
};

export default defineConfig([
  {
    input,
    output: {
      ...sharedOutput,
      format: 'cjs',
      entryFileNames: formatEntry('cjs'),
      chunkFileNames: '_chunk/[name]-[hash:7].cjs',
    },
  },
  {
    input,
    output: {
      ...sharedOutput,
      format: 'esm',
      entryFileNames: formatEntry('mjs'),
      chunkFileNames: '_chunk/[name]-[hash:7].mjs',
    },
    plugins: [dts()],
  },
]);
