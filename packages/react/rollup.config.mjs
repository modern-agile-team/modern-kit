import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import { dts } from 'rollup-plugin-dts';

import {
  componentsPathKeys,
  hooksPathKeys,
  utilsPathKey,
} from './subPaths.mjs';

import { getSubEntryMap, getFormatEntryFileNames } from './build.utils.mjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const input = {
  index: './src/index.ts', // 진입 경로,
  ...getSubEntryMap(componentsPathKeys, 'components'),
  ...getSubEntryMap(hooksPathKeys, 'hooks'),
  ...getSubEntryMap(utilsPathKey, 'utils'),
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
        chunkFileNames: `_chunk/[name]-[hash:6].mjs`,
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions }),
      commonjs(),
      esbuild(),
      postcss({
        modules: true,
        minimize: true,
        plugins: [autoprefixer()],
      }),
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
