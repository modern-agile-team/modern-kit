# Contributing
`@modern-kit`은 개발자라면 누구든지 기여하실 수 있습니다. 모든 기여에 감사드립니다! 🙏

<br />

## Issue
`@modern-kit`의 버그 및 개선 사항에 대한 의견은 `Issue`를 통해 제안하실 수 있습니다.

<br />

## Pull Request
Issue를 생성해서 제안하는 것 외에도 `@modern-kit`을 `fork`하고 직접 개선 작업을 수행한 후 `Pull Request`를 생성할 수 있습니다.

<br />

### 작업 전에 아래 사항들을 확인해주세요. 🙏
- 새로운 기능을 추가하는 경우 이슈를 열어 미리 논의해 주세요.
- 패키지 매니저 `yarn(berry)`을 사용해주세요.
- 개발에 필요한 Node version은 `v20`입니다. `nvm install`, `nvm use` 명령어를 통해 쉽게 노드 버전을 맞출 수 있습니다.
  - `nvm`이 설치되어 있지 않다면 설치해주세요.

```shell
nvm install
```
```shell
nvm use
```

- 작업 후 Pull Request 생성 전에 `eslint`, `typecheck`, `test` 를 진행해주세요. 

```shell
yarn eslint packages
yarn typecheck
yarn test
```

- 위 명령어들을 `build` 명령어를 통해 통합해서 진행할 수 있습니다.

```shell
yarn build
```

<br />

### 문서 작업 📄
- root폴더에 `docs`폴더에서 문서들을 관리하고 있습니다.
- `md`, `mdx` 파일을 모두 활용하고 있습니다. 실습 예제를 작성하려면 mdx 포맷을 활용해주세요.
  - 기존에 작업된 문서들을 참고해주시고, 같은 포맷으로 작업해주세요.
  - mdx로 문서를 생성하고 예제를 추가하기 위해서는 사전에 `packages`가 build가 되어야 합니다. 사전에 `yarn build`를 진행해주세요.
- `yarn start:docs`명령어를 통해 `개발 서버`를 열어 작업중인 문서를 확인할 수 있습니다.
- 작업 후 `yarn build:docs`가 정상적으로 수행되어야 합니다.

<br />

## Conventional Commits

```
<type>(<package scope>): <descriptions>

ex: feat(react): Add useToggle hook
```


### 1. Type
커밋 타입은 다음 중 하나입니다.
- feat: 신규 기능
- fix: 버그 수정 및 코드 개선
- refactor: 코드 리팩토링(신규 기능 추가 X)
- test: 테스트 코드 추가 및 개선
- docs: 문서 작업

### 2. Package Scope
- 작업을 진행 한 패키지 명입니다.
  - react
  - utils
  - types

### 3. Descriptions
- 작업한 변경 사항에 대한 요약 설명입니다.

<br />