import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import { dts } from 'rollup-plugin-dts';

import { getAllEntries, getFormatEntryFileNames } from './build.utils.mjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const input = {
  index: './src/index.ts', // 진입 경로
  ...getAllEntries(),
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
