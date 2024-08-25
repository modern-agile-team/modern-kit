import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';

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
  external: ['react', 'react-dom'],
  plugins: [
    peerDepsExternal(),
    nodeResolve({
      extensions,
    }),
    typescript({
      exclude: ['**/*.spec.tsx', '**/*.spec.ts'],
    }),
    commonjs(),
    esbuild(),
    postcss({
      extract: false,
      modules: true,
      minimize: true,
    }),
    terser(),
  ],
  // css cannot find module 대응, @rollup/plugin-typescript TS2307
  onwarn: (warning, warn) => {
    if (/module.css/.test(warning.message)) {
      return;
    }
    // Use default warning handler
    warn(warning);
  },
};
