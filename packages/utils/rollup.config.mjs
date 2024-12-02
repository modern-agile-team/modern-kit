import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
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
  plugins: [
    nodeResolve({
      extensions,
    }),
    commonjs(),
    esbuild({ minify: true }),
    typescript({ tsconfig: './tsconfig.json', exclude: ['**/*.spec.ts'] }),
  ],
};
