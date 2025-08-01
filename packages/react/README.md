# @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a>

React와 관련된 유용한 `컴포넌트`와 `커스텀 훅`을 제공하는 라이브러리입니다.

<br />

## Documentation
`@modern-kit`의 공식 문서는 아래 웹사이트에서 확인하실 수 있습니다
- <a href="https://modern-agile-team.github.io/modern-kit" target="_blank">https://modern-agile-team.github.io/modern-kit</a>

<br />

## Download
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

## Usage

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

## License
MIT © Modern Agile. See [LICENSE](../../LICENSE) for details.

<br />