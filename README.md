# @modern-kit

<p>
  <img align="center" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img align="center" src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FModern-Agile-Team%2Fmodern-kit&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/>
</p>

<br />

`@modern-kit`는 클라이언트 개발에 유용한 `리액트 커스텀 훅` 및 `유틸리티 함수`를 제공하는 라이브러리 입니다.

`@modern-kit`는 Next.js의 `SSR(Server Side Rendering)`환경에서도 호환되기 위해 `CJS(CommonJs)`와 `ESM(ECMAScript Module)` 두 포맷을 모두 지원합니다.

<br />

## Documentation
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

## Tests

```shell
yarn test
```

- `vitest`와 `react-testing-library`로 테스트를 실행할 수 있습니다.

```shell
yarn typecheck
```

- 타입 체크를 할 수 있습니다.

<br />

## Contributing
모든 기여에 감사드리며, 모던 애자일 소속이라면 누구나 라이브러리에 기여할 수 있습니다.
[Contributing Guide](./.github/CONTRIBUTING.md)

#### Contributors
<a href="https://github.com/modern-agile-team/modern-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Modern-Agile-Team/modern-kit">
</a>

<br />
<br />

## Stack
- Node v20
- React, TypeScript
- Vitest, React-Testing-Library
- Rollup, ESBuild
- Yarn Berry(v4) & Workspaces
- Lerna (for Versioning & Publishing)
- docusaurus (documentation)

<br />

## Tools

- `Yarn Berry`와 `workspaces`를 활용해 Monolithic Repository환경을 구축
  - packages 내부의 패키지들은 `로컬 패키지`처럼 상호의존성을 갖습니다.
- `lerna`를 통해 통합 빌드, 테스트, 배포 환경을 구축
- `github actions`를 활용한 CI/CD 구축
- `changeset`을 활용해 모노레포 환경에서 package 일관성 유지 및 NPM 배포 진행
- `dependabot`을 활용한 자동 의존성 관리
- `docusaurus`를 활용한 문서화

<br />

## License
MIT © Modern Agile. See [LICENSE](./LICENSE) for details.

<br />