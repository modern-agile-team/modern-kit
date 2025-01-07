# @modern-kit/types <a href="https://www.npmjs.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/types.svg" /></a>

클라이언트 개발에 유용한 타입스크립트 유틸 타입들을 제공합니다.

<br />

## Documentation
`@modern-kit`의 공식 문서는 아래 웹사이트에서 확인하실 수 있습니다
- <a href="https://modern-agile-team.github.io/modern-kit" target="_blank">https://modern-agile-team.github.io/modern-kit</a>

<br />

## Download
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

## Usage

```ts
import { Merge } from '@modern-kit/types';

type A = { a: string, b: number }
type B = { b: string, c: boolean }
type Result = Merge<A, B>
// { a: string, b: string, c: boolean }
```

<br />

## License
MIT © Modern Agile. See [LICENSE](../../LICENSE) for details.

<br />