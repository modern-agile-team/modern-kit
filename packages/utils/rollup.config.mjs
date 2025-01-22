import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { dts } from 'rollup-plugin-dts';

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

const input = {
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
};

export default [
  {
    input,
    output: [
      {
        dir: './dist',
        sourcemap: true,
        format: 'cjs',
        entryFileNames: (chunkInfo) =>
          getFormatEntryFileNames(chunkInfo, 'cjs'),
        chunkFileNames: `_chunk/[name]-[hash:6].cjs`,
      },
      {
        dir: './dist',
        sourcemap: true,
        format: 'esm',
        entryFileNames: (chunkInfo) =>
          getFormatEntryFileNames(chunkInfo, 'mjs'),
        chunkFileNames: `_chunk/[name]-[hash:6].cjs`,
      },
    ],
    plugins: [
      nodeResolve({
        extensions,
      }),
      commonjs(),
      esbuild(),
    ],
  },
  {
    // d.ts 파일 직접 생성
    input,
    output: [
      {
        dir: 'dist',
        entryFileNames: (chunkInfo) =>
          getFormatEntryFileNames(chunkInfo, 'd.ts'),
        chunkFileNames: `_chunk/[name]-[hash:6].d.ts`,
      },
    ],
    plugins: [dts()],
  },
];
