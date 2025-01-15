import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';

import {
  arrayPathKeys,
  clipboardPathKeys,
  commonPathKeys,
  datePathKeys,
  deviceKeys,
  fileKeys,
  formatterKeys,
  mathKeys,
  objectKeys,
  regexKeys,
  storageKeys,
  stringKeys,
  styleKeys,
  validatorKeys,
} from './subPaths.mjs';

import { getSubEntryMap, getFormatEntryFileNames } from './build.utils.mjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: {
    index: './src/index.ts', // 진입 경로
    ...getSubEntryMap(arrayPathKeys, 'array'),
    ...getSubEntryMap(clipboardPathKeys, 'clipboard'),
    ...getSubEntryMap(commonPathKeys, 'common'),
    ...getSubEntryMap(datePathKeys, 'date'),
    ...getSubEntryMap(deviceKeys, 'device'),
    ...getSubEntryMap(fileKeys, 'file'),
    ...getSubEntryMap(formatterKeys, 'formatter'),
    ...getSubEntryMap(mathKeys, 'math'),
    ...getSubEntryMap(objectKeys, 'object'),
    ...getSubEntryMap(regexKeys, 'regex'),
    ...getSubEntryMap(storageKeys, 'storage'),
    ...getSubEntryMap(stringKeys, 'string'),
    ...getSubEntryMap(styleKeys, 'style'),
    ...getSubEntryMap(validatorKeys, 'validator'),
  },
  output: [
    {
      dir: './dist',
      sourcemap: true,
      format: 'cjs',
      entryFileNames: (chunkInfo) => getFormatEntryFileNames(chunkInfo, 'cjs'),
    },
    {
      dir: './dist',
      sourcemap: true,
      format: 'esm',
      entryFileNames: (chunkInfo) => getFormatEntryFileNames(chunkInfo, 'mjs'),
    },
  ],
  plugins: [
    nodeResolve({
      extensions,
    }),
    commonjs(),
    esbuild(),
    typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.spec.ts'] }),
  ],
};
