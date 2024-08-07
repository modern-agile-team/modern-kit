import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
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
    commonjs(),
    esbuild(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.spec.tsx', '**/*.spec.ts'],
    }),
    postcss({
      extract: false,
      modules: true,
      minimize: true,
    }),
    terser(),
  ],
  // css not find module 대응
  onwarn: (warning, warn) => {
    // Check if the warning is the one you want to ignore
    if (warning.code === 'PLUGIN_WARNING' && /TS2307/.test(warning.message)) {
      return;
    }
    // Use default warning handler
    warn(warning);
  },
};
