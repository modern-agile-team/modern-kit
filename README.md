# @modern-kit

<p>
  <a href="./README.md"><b>한국어</b></a> | <a href="./README.en.md">English</a>
</p>

<p>
  <img align="center" src="https://img.shields.io/badge/license-MIT-blue.svg">
</p>

<br />

`@modern-kit`는 클라이언트 개발에 유용한 **리액트 컴포넌트**, **커스텀 훅**, **유틸리티 함수**, **타입**을 제공하는 라이브러리입니다.

단순히 모듈을 제공하는 것을 넘어, 다양한 구현 방식에 대한 **레퍼런스** 역할도 함께 합니다.

`@modern-kit`는 Next.js SSR 환경을 비롯한 CJS 환경과의 호환성을 위해 **CJS(CommonJS)** 와 **ESM(ECMAScript Module)** 두 포맷을 모두 지원합니다.

<br />

## 공식 문서

`@modern-kit`의 공식 문서는 아래에서 확인하실 수 있습니다.

- <a href="https://modern-agile-team.github.io/modern-kit" target="_blank">https://modern-agile-team.github.io/modern-kit</a>

<br />

## 패키지

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a>

React와 관련된 유용한 **컴포넌트**와 **커스텀 훅**을 제공하는 라이브러리입니다.

<br />

<b>설치</b>

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

<b>사용 예시</b>

```tsx
import { useInterval } from '@modern-kit/react';

const App = () => {
  useInterval(() => {
    console.log('interval');
  }, 300);

  return <div>Modern Kit</div>;
};
```

<br />

### @modern-kit/utils <a href="https://www.npmjs.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/utils.svg" /></a>

클라이언트 개발에 유용한 **유틸리티 함수**를 제공하는 라이브러리입니다.

<br />

<b>설치</b>

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

<b>사용 예시</b>

```ts
import { flatten } from '@modern-kit/utils';

const arr = [1, [2, [3, 4], 5]];
const result = flatten(arr); // [1, 2, 3, 4, 5]
```

<br />

### @modern-kit/types <a href="https://www.npmjs.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/types.svg" /></a>

클라이언트 개발에 유용한 **유틸 타입**을 제공하는 라이브러리입니다.

<br />

<b>설치</b>

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

<b>사용 예시</b>

```ts
import { Merge } from '@modern-kit/types';

type A = { a: string; b: number };
type B = { b: string; c: boolean };
type Result = Merge<A, B>;
// { a: string; b: string; c: boolean }
```

<br />

## SubPath

`@modern-kit/react`와 `@modern-kit/utils`는 SubPath를 통해 개별 모듈을 직접 불러올 수 있습니다.

**SubPath를 사용하면 다음과 같은 이점이 있습니다.**

- 필요한 모듈만 가져오기 때문에 **불필요한 코드 로딩을 방지**합니다.
- 번들러가 모듈을 더 정확히 식별할 수 있어 **Tree-shaking**이 더욱 효과적으로 동작합니다. 결과적으로 최종 번들 크기를 줄이는 데 도움이 됩니다.
- **버전 호환성 문제**를 해결할 수 있습니다. 예를 들어 `useSyncExternalStore`는 React v18 이상에서만 사용 가능한데, React v17 환경에서 전체 모듈을 가져오면 해당 API를 사용하지 않더라도 로딩 시 충돌이 발생할 수 있습니다. SubPath를 사용하면 필요한 모듈만 직접 가져와 이 문제를 해결할 수 있습니다.

```ts
// tsconfig moduleResolution 옵션이 `node`일 경우
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
// tsconfig moduleResolution 옵션이 `bundler`일 경우
import { useInterval } from '@modern-kit/react/hooks/useInterval';
```

<details>
  <summary><b>Next.js 개발 환경에서의 SubPath 효과 비교</b></summary>

  <h3>SubPath 미사용</h3>

```tsx
import { flatten } from '@modern-kit/utils';

export default function Home() {
  console.log(flatten([1, [2], [3], [4], [5]]));

  return <div>Modern Kit</div>;
}
```

  <img width="600" alt="스크린샷 2025-01-16 오전 5 13 20" src="https://github.com/user-attachments/assets/abd1881d-ae7c-4a66-9b2f-83184571b9d3" />

  <br />
  <br />

SubPath를 사용하지 않으면 `@modern-kit/utils`의 **모든 모듈**이 함께 로드됩니다.

  <br />

  <h3>SubPath 사용</h3>

```tsx
// tsconfig moduleResolution 옵션이 `node`
import { flatten } from '@modern-kit/utils/dist/array/flatten';

export default function Home() {
  console.log(flatten([1, [2], [3], [4], [5]]));

  return <div>{}</div>;
}
```

  <img width="600" alt="스크린샷 2025-01-16 오전 5 12 10" src="https://github.com/user-attachments/assets/6f3bc81d-06f5-4617-b941-b83fea4204aa" />

  <br />
  <br />

SubPath를 사용하면 `flatten` **하나만** 로드됩니다. 이러한 차이는 개발 서버 성능에도 영향을 줄 수 있습니다.

</details>

<br />

## 개발 환경 설정

- 모든 명령어는 **root(src) 폴더**에서 실행합니다.
- 패키지 매니저: **Yarn Berry (v4+)**
- Node 버전: **v24+**

<br />

## 명령어

```shell
yarn eslint packages
```

모든 패키지의 **lint** 검사를 실행합니다.

```shell
yarn test
```

`vitest`와 `react-testing-library`를 사용한 **테스트**를 실행합니다.

```shell
yarn typecheck
```

전체 패키지의 **타입 검사**를 실행합니다.

```shell
yarn build
```

모든 패키지의 **빌드**와 함께 lint, test, typecheck를 순차적으로 실행합니다.

<br />

## Benchmark

`@modern-kit/utils`는 벤치마크 테스트를 지원합니다. `packages/utils` 디렉토리에서 실행하세요.

```shell
# 전체 벤치마크 실행
yarn test:bench

# 개별 벤치마크 실행
yarn test:bench flatten.bench.ts
```

<br />

## 문서 작업

`@modern-kit`은 [Docusaurus](https://docusaurus.io/)를 기반으로 문서를 관리합니다.

```shell
# 한국어 문서 개발 서버 실행
yarn start
yarn start:ko

# 영어 문서 개발 서버 실행
yarn start:en
```

```shell
# 문서 빌드 (신규 문서 작업 후 반드시 확인)
yarn build:docs
```

<br />

## Contributing

`@modern-kit`에 기여해주셔서 감사합니다! 누구나 기여할 수 있습니다.

[Contributing Guide](./.github/CONTRIBUTING.md)

#### Contributors

<a href="https://github.com/modern-agile-team/modern-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit">
</a>

<br />
<br />

## License

MIT © Modern Agile. See [LICENSE](./LICENSE) for details.
