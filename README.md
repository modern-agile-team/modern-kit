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

## Usage

### @modern-kit/react <a href="https://www.npmjs.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/react.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/react" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/react/latest"></a>

- React와 관련된 유용한 `컴포넌트`와 `커스텀 훅`을 제공하는 라이브러리입니다.

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

### @modern-kit/utils <a href="https://www.npmjs.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/utils.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/utils" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/utils/latest"></a>

- 클라이언트 개발과 관련된 유용한 `유틸리티 함수`를 제공하는 라이브러리입니다.

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

### @modern-kit/types <a href="https://www.npmjs.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/npm/v/@modern-kit/types.svg" /></a> <a href="https://bundlephobia.com/package/@modern-kit/types" target="_blank"><img align="center" src="https://img.shields.io/bundlephobia/minzip/@modern-kit/types/latest"></a>

- 유용한 `유틸 타입`들을 제공하는 라이브러리 입니다.

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
모든 기여에 감사드립니다! 누구든지 라이브러리에 기여할 수 있습니다.
[Contributing Guide](./.github/CONTRIBUTING.md)

#### Contributors
<a href="https://github.com/modern-agile-team/modern-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit">
</a>

<br />
<br />

## Tools

- `Yarn Berry(v4)`와 `workspaces`를 활용해 **Monolithic Repository** 환경을 구축
  - packages 내부의 패키지들은 **로컬 패키지**처럼 **상호 의존성**을 갖습니다.
- `lerna`를 활용한 **통합 빌드**, **통합 테스트**, **통합 배포** 환경 구축
- `github actions`를 활용한 **CI/CD** 구축
- `changeset`을 활용한 모노레포 환경에서 **패키지 일관성 유지** 및 **NPM 배포** 진행
- `dependabot`을 활용한 **자동 의존성** 관리
- `codecov`를 활용한 **테스트 코드 커버리지 리포트** 및 **신뢰성 있는 코드** 제공
- `docusaurus`를 활용한 **공식 문서 제공**
- `vitest`를 활용한 **테스트 코드 작성 및 테스트** 진행
  - @modern-kit/utils의 경우 `Benchmark` 테스트 포함

<br />

## License
MIT © Modern Agile. See [LICENSE](./LICENSE) for details.