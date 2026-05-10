import { createRequire } from 'node:module';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rolldown-plugin-dts';
import { defineConfig } from 'rolldown';
import { createInput, formatEntry } from '../../scripts/build.utils.mjs';

const pkg = createRequire(import.meta.url)('./package.json');

const input = createInput(['hooks', 'components', 'utils']);

const external = [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
];

const sharedPlugins = [peerDepsExternal()];

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
    external,
    plugins: sharedPlugins,
  },
  {
    input,
    output: {
      ...sharedOutput,
      format: 'esm',
      entryFileNames: formatEntry('mjs'),
      chunkFileNames: '_chunk/[name]-[hash:7].mjs',
    },
    external,
    plugins: [dts(), ...sharedPlugins],
  },
]);
