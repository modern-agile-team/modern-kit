# @modern-kit

<p>
  <img align="center" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img align="center" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FModern-Agile-Team%2Fmodern-kit&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/>
</p>

<br />

`@modern-kit`는 클라이언트 개발에 유용한 `리액트 컴포넌트`, `커스텀 훅` 및 `유틸리티 함수`, `타입`을 제공하는 라이브러리입니다. 

클라이언트 개발에 필요한 모듈들을 제공하는 것 뿐만아니라, `다양한 레퍼런스를 제공`하기 위한 목적을 갖고 있습니다.

`@modern-kit`는 Next.js의 `SSR(Server Side Rendering)`환경에서도 호환되는 등 `CJS(CommonJs)`환경에서도 호환되기 위해 `CJS(CommonJs)`와 `ESM(ECMAScript Module)` 두 포맷을 모두 지원합니다.

`@modern-kit`은 한국인들의 접근성을 높이고 진입 장벽을 낮추기 위해, `한국어만을 지원`합니다. (wip. 영어로 작성된 부분들을 단계적으로 한국어로 교체 할 예정입니다.)

<br />

## Official Documentation
`@modern-kit`의 공식 문서는 아래 웹사이트에서 확인하실 수 있습니다
- <a href="https://modern-agile-team.github.io/modern-kit" target="_blank">https://modern-agile-team.github.io/modern-kit</a>

<br />

## Library

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/react/latest"></a>

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
// tsconfig moduleResolution 옵션이 `node`일 경우
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
// tsconfig moduleResolution 옵션이 `bundler`일 경우
import { useInterval } from '@modern-kit/react/hooks/useInterval';

const App = () => {
  useInterval(() => {
    console.log('interval');
  }, 300);

  return <div>Modern Kit</div>;
}
```

<br />

### @modern-kit/utils <a href="https://www.npmjs.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/utils.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/utils/latest"></a>

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

<br />

## SubPath
- `@modern-kit/react`, `@modern-kit/utils`는 `SubPath`를 사용하여 개별 모듈을 불러올 수 있습니다.
- 전체 모듈을 불러오는 것이 아닌 필요한 모듈만 직접 가져오기 때문에 `불 필요한 코드를 불러오는 것을 방지`할 수 있으며, `번들러가 모듈을 읽고, 식별하는 과정`을 최적화 할 수 있습니다.
- 번들러가 개별 모듈을 더 잘 식별할 수 있기 때문에, `Tree-shaking`이 더욱 효과적으로 동작하도록 개선 할 수 있습니다. 이는 결과적으로 최종 번들 크기를 줄이는데 도움이 됩니다.

```tsx
// tsconfig moduleResolution 옵션이 `node`일 경우
import { useInterval } from '@modern-kit/react/dist/hooks/useInterval';
// tsconfig moduleResolution 옵션이 `bundler`일 경우
import { useInterval } from '@modern-kit/react/hooks/useInterval';

const App = () => {
  useInterval(() => {
    console.log('interval');
  }, 300);

  return <div>Modern Kit</div>;
}
```

<details>
  <summary><b>Next.js 개발 환경 SubPath 사용 차이</b></summary>

  <h3>SubPath 사용하지 않은 경우</h3>

  ```tsx
  import { flatten } from "@modern-kit/utils";

  export default function Home() {
    console.log(flatten([1, [2], [3], [4], [5]]));

    return (
      <div>{}</div>
    );
  }
  ```

  <img width="600" alt="스크린샷 2025-01-16 오전 5 13 20" src="https://github.com/user-attachments/assets/abd1881d-ae7c-4a66-9b2f-83184571b9d3" />

  <br />
  <br />

  첫 번째 이미지는 `SubPath`를 사용하지 않은 경우입니다. 전체 모듈에서 `flatten`을 가져온 경우입니다.
  위 이미지와 같이 `@modern-kit/utils`의 모든 모듈을 불러오는 것을 확인 할 수 있습니다.

  <br />

  <h3>SubPath 사용한 경우</h3>

  ```tsx
  // tsconfig moduleResolution 옵션이 `node`
  import { flatten } from "@modern-kit/utils/dist/array/flatten";

  export default function Home() {
    console.log(flatten([1, [2], [3], [4], [5]]));

    return (
      <div>{}</div>
    );
  }
  ```

  <img width="600" alt="스크린샷 2025-01-16 오전 5 12 10" src="https://github.com/user-attachments/assets/6f3bc81d-06f5-4617-b941-b83fea4204aa" />

  <br />
  <br />

  두 번째 이미지는 `SubPath`를 사용한 경우입니다. 개별 경로를 통해 `flatten`을 가져온 경우입니다.
  첫 번째 케이스와 다르게 사용하는 `@modern-kit/utils`의 `flatten`만 불러오는 것을 확인 할 수 있습니다.

  이러한 차이는 개발 서버 성능에 영향을 미칠 수 있습니다.

</details>


<br />

## Lint & Test & build

- `root` 폴더에서 진행해주세요.
- 패키지 매니저는 `yarn berry`, Node 버전은 `v20`을 사용하셔야 합니다.

```shell
yarn eslint packages
```

- 위 명령어를 통해 모든 패키지의 `lint` 검사를 진행할 수 있습니다.

```shell
yarn test
```

- `test` 명령어를 통해 `vitest`와 `react-testing-library`로 테스트를 진행할 수 있습니다.

```shell
yarn typecheck
```

- `typecheck` 명령어를 통해 `typecheck`를 진행할 수 있습니다.

```shell
yarn build
```

- `build` 명령어를 통해 관리하는 모든 패키지들의 build, 상단의 lint, test, typecheck를 모두 진행합니다.

<br />

## Benchmark
- @modern-kit/utils의 경우 `benchmark` 테스트를 진행 할 수 있습니다.
- `packages/utils` 폴더에서 아래 명령어를 실행하면 `전체 benchmark 테스트 코드`를 실행 할 수 있습니다.

```shell
yarn test:bench
```

- `개별 benchmark 테스트 코드`를 실행하려면 아래와 같이 실행 할 수 있습니다.
```shell
yarn test:bench flatten.bench.ts
```

<br />

## Documentation
- @modern-kit은 [docusaurus](https://docusaurus.io/)를 기반으로 문서화 작업을 진행합니다.
```shell
yarn start:docs
```

- `start:docs` 명령어를 통해 개발 서버를 실행해 문서 작업을 미리 확인 할 수 있습니다.

```shell
yarn build:docs
```

- `build:docs` 명령어를 통해 document build를 진행합니다. 
- 신규 문서 작업 후 해당 build 작업이 정상적으로 진행되어야 합니다.

<br />

## Contributing
`@modern-kit`에 기여해주셔서 감사드립니다! 누구든지 `@modern-kit`에 기여할 수 있습니다.
[Contributing Guide](./.github/CONTRIBUTING.md)

#### Contributors
<a href="https://github.com/modern-agile-team/modern-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit">
</a>

<br />
<br />

## License
MIT © Modern Agile. See [LICENSE](./LICENSE) for details.