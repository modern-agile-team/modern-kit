import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert { type: 'json' };
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const componentSubEntryKeys = [
  'AspectRatio',
  'ClientGate',
  'Mounted',
  'DebounceHandler',
  'FallbackLazyImage',
  'IfElse',
  'InfiniteScroll',
  'InView',
  'Iterator',
  'LazyImage',
  'OutsidePointerDownHandler',
  'Portal',
  'SeparatedIterator',
  'Slot',
  'When',
  'SwitchCase',
];

const hookSubEntryKeys = [
  'useAsyncEffect',
  'useAsyncProcessQueue',
  'useBeforeUnload',
  'useBlockMultipleAsyncCalls',
  'useClipboard',
  'useColorScheme',
  'useCounter',
  'useCycleList',
  'useDebounce',
  'useDebouncedInputValue',
  'useDebouncedState',
  'useDocumentTitle',
  'useEventListener',
  'useFileReader',
  'useFocus',
  'useForceUpdate',
  'useHover',
  'useImageStatus',
  'useIntersectionObserver',
  'useInterval',
  'useIsMounted',
  'useIsomorphicLayoutEffect',
  'useKeyDown',
  'useLocalStorage',
  'useMediaQuery',
  'useMergeRefs',
  'useMouse',
  'useNetwork',
  'useOutsidePointerDown',
  'usePreferredColorScheme',
  'usePreservedCallback',
  'usePreservedState',
  'usePrevious',
  'useResizeObserver',
  'useScrollLock',
  'useScrollTo',
  'useSessionStorage',
  'useStep',
  'useStepState',
  'useThrottle',
  'useTimeout',
  'useToggle',
  'useToggleState',
  'useUnmount',
  'useUserAgent',
  'useVhProperty',
  'useVisibilityChange',
  'useWindowSize',
  'useDependencyTimeout',
];

const internalEntryKey = ['storage', 'timeout'];

const utilsEntryKey = ['mergeRefs', 'polymorphicForwardRef'];

const getSubEntries = (keys, path) => {
  return keys.reduce((acc, entry) => {
    acc[`${path}-${entry}`] = `./src/${path}/${entry}`;
    return acc;
  }, {});
};

export default {
  preserveModules: true,
  input: {
    index: './src/index.ts', // 진입 경로,
    ...getSubEntries(componentSubEntryKeys, 'components'),
    ...getSubEntries(hookSubEntryKeys, 'hooks'),
    ...getSubEntries(utilsEntryKey, 'utils'),
    ...getSubEntries(internalEntryKey, '_internal'),
  },
  output: [
    {
      dir: './dist',
      sourcemap: true,
      format: 'cjs',
      entryFileNames: (chunkInfo) => {
        if (chunkInfo.name.startsWith('_internal')) {
          const name = chunkInfo.name.replace('_internal-', '');
          return `_internal/${name}.js`; // 원하는 경로로 설정
        }

        if (chunkInfo.name.startsWith('utils')) {
          const name = chunkInfo.name.replace('utils-', '');
          return `utils/${name}.js`; // 원하는 경로로 설정
        }

        if (chunkInfo.name.startsWith('components')) {
          const name = chunkInfo.name.replace('components-', '');
          return `components/${name}/${name}.js`; // 원하는 경로로 설정
        }

        if (chunkInfo.name.startsWith('hooks')) {
          const name = chunkInfo.name.replace('hooks-', '');
          return `hooks/${name}/${name}.js`; // 원하는 경로로 설정
        }

        return '[name].js'; // 기본 파일 이름
      },
    },
    {
      dir: './dist',
      sourcemap: true,
      format: 'esm',
      entryFileNames: (chunkInfo) => {
        console.log(chunkInfo);

        if (chunkInfo.name.startsWith('_internal')) {
          const name = chunkInfo.exports[0];
          return `_internal/${name}.mjs`; // 원하는 경로로 설정
        }

        if (chunkInfo.name.startsWith('utils')) {
          const name = chunkInfo.exports[0];
          return `utils/${name}.mjs`; // 원하는 경로로 설정
        }

        if (chunkInfo.name.startsWith('components')) {
          const name = chunkInfo.exports[0];
          return `components/${name}/${name}.mjs`; // 원하는 경로로 설정
        }

        // 파일 이름을 경로에 맞게 설정
        if (chunkInfo.name.startsWith('hooks')) {
          const name = chunkInfo.exports[0];
          return `hooks/${name}/${name}.mjs`; // 원하는 경로로 설정
        }

        return '[name].mjs'; // 기본 파일 이름
      },
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
    esbuild(),
    postcss({
      modules: true,
      minimize: true,
      plugins: [autoprefixer()],
    }),
  ],
};
