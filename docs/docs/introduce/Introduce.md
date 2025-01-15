# @modern-kit

`@modern-kit`는 클라이언트 개발에 유용한 `리액트 컴포넌트`, `커스텀 훅` 및 `유틸리티 함수`, `타입`을 제공하는 라이브러리입니다. 

클라이언트 개발에 필요한 모듈을 제공하는 것 뿐만아니라, 코드적으로 `다양한 레퍼런스를 제공` 하기 위한 목적을 갖고 있습니다.

`@modern-kit`는 Next.js의 `SSR(Server Side Rendering)`환경에서도 호환되는 등 `CJS(CommonJs)`환경에서도 호환되기 위해 `CJS(CommonJs)`와 `ESM(ECMAScript Module)` 두 포맷을 모두 지원합니다.

<br />

## Library

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/react/latest" /></a>

- React와 관련된 유용한 `컴포넌트`와 `커스텀 훅`을 제공하는 라이브러리입니다.

<br />

<b>Download</b>

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
}
```
```ts
// SubPath 사용 예시
// tsconfig moduleResolution 옵션이 `bundler`일 경우
import { flatten } from '@modern-kit/utils/array/flatten';
// tsconfig moduleResolution 옵션이 `node`일 경우
import { flatten } from '@modern-kit/utils/dist/array/flatten';

const arr = [1, [2, [3, 4], 5]];
const result = flatten(arr); // [1, 2, 3, 4, 5]
```

<br />

### @modern-kit/utils <a href="https://www.npmjs.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/utils.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/utils/latest" /></a>

- 클라이언트 개발에 유용한 `유틸리티 함수`를 제공하는 라이브러리입니다.

<br />

<b>Download</b>

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
// SubPath 사용 예시
// tsconfig moduleResolution 옵션이 `bundler`일 경우
import { flatten } from '@modern-kit/utils/array/flatten';
// tsconfig moduleResolution 옵션이 `node`일 경우
import { flatten } from '@modern-kit/utils/dist/array/flatten';

const arr = [1, [2, [3, 4], 5]];
const result = flatten(arr); // [1, 2, 3, 4, 5]
```

<br />

### @modern-kit/types <a href="https://www.npmjs.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/types.svg" /></a>

- 클라이언트 개발에 유용한 `유틸 타입`들을 제공하는 라이브러리 입니다.

<br />

<b>Download</b>

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

type A = { a: string, b: number }
type B = { b: string, c: boolean }
type Result = Merge<A, B>
// { a: string, b: string, c: boolean }
```

