import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import {
  componentsPathKeys,
  hooksPathKeys,
  utilsPathKey,
} from './subPaths.mjs';

import { getSubEntryMap, getFormatEntryFileNames } from './build.utils.mjs';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  preserveModules: true,
  input: {
    index: './src/index.ts', // 진입 경로,
    ...getSubEntryMap(componentsPathKeys, 'components'),
    ...getSubEntryMap(hooksPathKeys, 'hooks'),
    ...getSubEntryMap(utilsPathKey, 'utils'),
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
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions,
    }),
    typescript({
      exclude: ['**/*.spec.tsx', '**/*.spec.ts', './src/_internal/test/*'],
    }),
    commonjs(),
    esbuild(),
    postcss({
      modules: true,
      minimize: true,
      plugins: [autoprefixer()],
    }),
  ],
};
