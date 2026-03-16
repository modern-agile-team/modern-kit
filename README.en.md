# @modern-kit

<p>
  <a href="./README.md">한국어</a> | <a href="./README.en.md"><b>English</b></a>
</p>

<p>
  <img align="center" src="https://img.shields.io/badge/license-MIT-blue.svg">
</p>

<br />

`@modern-kit` is a library that provides **React components**, **custom hooks**, **utility functions**, and **TypeScript types** for client-side development.

Beyond just providing modules, it also serves as a **reference** for various implementation patterns.

`@modern-kit` supports both **CJS (CommonJS)** and **ESM (ECMAScript Module)** formats to ensure compatibility with CJS environments, including Next.js SSR.

<br />

## Official Documentation

The official documentation for `@modern-kit` is available at:

- <a href="https://modern-agile-team.github.io/modern-kit" target="_blank">https://modern-agile-team.github.io/modern-kit</a>

<br />

## Packages

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a>

A library that provides useful **React components** and **custom hooks**.

<br />

<b>Install</b>

```shell
npm i @modern-kit/react
```

```shell
yarn add @modern-kit/react
```

```shell
pnpm i @modern-kit/react
```

<br />

<b>Usage</b>

```tsx
import { useInterval } from '@modern-kit/react';

const App = () => {
  useInterval(() => {
    console.log('interval');
  }, 300);

  return <div>Modern Kit</div>;
};
```

```ts
// SubPath import example
// When tsconfig moduleResolution is `bundler`
import { flatten } from '@modern-kit/react/hooks/useInterval';
// When tsconfig moduleResolution is `node`
import { flatten } from '@modern-kit/react/dist/hooks/useInterval';

const App = () => {
  useInterval(() => {
    console.log('interval');
  }, 300);

  return <div>Modern Kit</div>;
};
```

<br />

### @modern-kit/utils <a href="https://www.npmjs.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/utils.svg" /></a>

A library that provides useful **utility functions** for client-side development.

<br />

<b>Install</b>

```shell
npm i @modern-kit/utils
```

```shell
yarn add @modern-kit/utils
```

```shell
pnpm i @modern-kit/utils
```

<br />

<b>Usage</b>

```ts
// SubPath import example
// When tsconfig moduleResolution is `bundler`
import { flatten } from '@modern-kit/utils/array/flatten';
// When tsconfig moduleResolution is `node`
import { flatten } from '@modern-kit/utils/dist/array/flatten';

const arr = [1, [2, [3, 4], 5]];
const result = flatten(arr); // [1, 2, 3, 4, 5]
```

<br />

### @modern-kit/types <a href="https://www.npmjs.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/types.svg" /></a>

A library that provides useful **TypeScript utility types** for client-side development.

<br />

<b>Install</b>

```shell
npm i @modern-kit/types
```

```shell
yarn add @modern-kit/types
```

```shell
pnpm i @modern-kit/types
```

<br />

<b>Usage</b>

```ts
import { Merge } from '@modern-kit/types';

type A = { a: string; b: number };
type B = { b: string; c: boolean };
type Result = Merge<A, B>;
// { a: string; b: string; c: boolean }
```

<br />

## SubPath

`@modern-kit/react` and `@modern-kit/utils` support SubPath imports, allowing you to load individual modules directly.

**Benefits of using SubPath:**

- **Prevents unnecessary code loading** by importing only the modules you need.
- Enables more effective **Tree-shaking**, as bundlers can identify individual modules more precisely — resulting in a smaller final bundle size.
- Solves **version compatibility issues**. For example, `useSyncExternalStore` requires React v18+. If you import the entire `@modern-kit/react` package in a React v17 environment, a conflict may occur at load time even if you don't use that API. SubPath lets you import only the specific module you need, avoiding the issue.

```ts
// When tsconfig moduleResolution is `node`
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
// When tsconfig moduleResolution is `bundler`
import { useInterval } from '@modern-kit/react/hooks/useInterval';
```

<details>
  <summary><b>SubPath effect comparison in Next.js dev environment</b></summary>

  <h3>Without SubPath</h3>

```tsx
import { flatten } from '@modern-kit/utils';

export default function Home() {
  console.log(flatten([1, [2], [3], [4], [5]]));

  return <div>{}</div>;
}
```

  <img width="600" alt="without subpath" src="https://github.com/user-attachments/assets/abd1881d-ae7c-4a66-9b2f-83184571b9d3" />

  <br />
  <br />

Without SubPath, **all modules** from `@modern-kit/utils` are loaded together.

  <br />

  <h3>With SubPath</h3>

```tsx
// tsconfig moduleResolution: `node`
import { flatten } from '@modern-kit/utils/dist/array/flatten';

export default function Home() {
  console.log(flatten([1, [2], [3], [4], [5]]));

  return <div>{}</div>;
}
```

  <img width="600" alt="with subpath" src="https://github.com/user-attachments/assets/6f3bc81d-06f5-4617-b941-b83fea4204aa" />

  <br />
  <br />

With SubPath, **only `flatten`** is loaded. This difference can also impact dev server performance.

</details>

<br />

## Development Setup

- All commands are run from the **root(src) directory**.
- Package manager: **Yarn Berry (v4+)**
- Node version: **v24+**

<br />

## Commands

```shell
yarn eslint packages
```

Runs **lint** checks across all packages.

```shell
yarn test
```

Runs **tests** using `vitest` and `react-testing-library`.

```shell
yarn typecheck
```

Runs **type checking** across all packages.

```shell
yarn build
```

Runs **build** for all packages, along with lint, test, and typecheck in sequence.

<br />

## Benchmark

`@modern-kit/utils` supports benchmark testing. Run the following from the `packages/utils` directory.

```shell
# Run all benchmarks
yarn test:bench

# Run a specific benchmark
yarn test:bench flatten.bench.ts
```

<br />

## Documentation

`@modern-kit` manages its documentation using [Docusaurus](https://docusaurus.io/).

```shell
# Start Korean docs dev server
yarn start
yarn start:ko

# Start English docs dev server
yarn start:en
```

```shell
# Build docs (always verify after adding new documentation)
yarn build:docs
```

<br />

## Contributing

Thank you for contributing to `@modern-kit`! Anyone is welcome to contribute.

[Contributing Guide](./.github/CONTRIBUTING.en.md)

#### Contributors

<a href="https://github.com/modern-agile-team/modern-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit">
</a>

<br />
<br />

## License

MIT © Modern Agile. See [LICENSE](./LICENSE) for details.
