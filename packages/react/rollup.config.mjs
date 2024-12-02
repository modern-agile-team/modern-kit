import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  preserveModules: true,
  input: './src/index.ts', // 진입 경로
  output: [
    {
      file: pkg.main,
      sourcemap: true,
      format: 'cjs',
    },
    {
      file: pkg.module,
      sourcemap: true,
      format: 'esm',
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
      exclude: ['**/*.spec.tsx', '**/*.spec.ts'],
    }),
    commonjs(),
    esbuild({ minify: true }),
    postcss({
      modules: true,
      minimize: true,
      plugins: [autoprefixer()],
    }),
  ],
};
