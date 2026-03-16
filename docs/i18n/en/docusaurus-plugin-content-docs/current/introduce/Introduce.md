# @modern-kit

`@modern-kit` is a library providing useful `React components`, `custom hooks`, `utility functions`, and `types` for client-side development.

It aims not only to provide modules needed for client-side development, but also to offer a wide variety of code references.

`@modern-kit` supports both `CJS(CommonJs)` and `ESM(ECMAScript Module)` formats to ensure compatibility with `CJS(CommonJs)` environments, including Next.js `SSR(Server Side Rendering)` environments.

<br />

## Library

<br />

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a>

- A library providing useful React components and custom hooks.

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

- A library providing useful utility functions for client-side development.

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
import { flatten } from '@modern-kit/utils';

const arr = [1, [2, [3, 4], 5]];
const result = flatten(arr); // [1, 2, 3, 4, 5]
```

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

- A library providing useful TypeScript utility types for client-side development.

<br />

<b>Install</b>

```shell
npm i -D @modern-kit/types
```

```shell
yarn add -D @modern-kit/types
```

```shell
pnpm i -D @modern-kit/types
```

<br />

<b>Usage</b>

```ts
import { Merge } from '@modern-kit/types';

type A = { a: string; b: number };
type B = { b: string; c: boolean };
type Result = Merge<A, B>;
// { a: string, b: string, c: boolean }
```
