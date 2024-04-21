# Contributing
모든 기여에 감사드립니다! 누구든지 라이브러리에 기여할 수 있습니다.

<br />

## Issues
`@modern-kit`의 버그 및 개선 사항에 대한 의견은 `Issue`를 통해 제안하실 수 있습니다.

<br />

## Pull Requests
이슈를 생성해서 제안하는 것 외에도 `@modern-kit`을 `fork`하고 직접 개선 작업을 수행한 후 `Pull Request`를 제안할 수 있습니다.

<br />

### 작업 전에 아래 주의 사항을 참고해주세요, 🙏
- 새로운 기능을 추가하는 경우 이슈를 열어 미리 논의해 주세요.
- 패키지 매니저 `yarn(yarn berry v4)`을 사용해주세요.
- 라이브러리 개발에는 노드 버전은 `v20`을 사용해주세요. `nvm install`, `nvm use` 명령어를 통해 쉽게 버전을 맞출 수 있습니다.
  - `nvm`이 설치되어 있지 않다면 설치해주세요.

<br />

```shell
nvm install
```
```shell
nvm use
```

- 작업 후 Pull Request 생성 전에 `test` 및 `typecheck`를 진행해주세요. 

```shell
yarn test
```
```shell
yarn typecheck
```

<br />

## Conventional Commits

```
<type>(<package scope>): <descriptions>

ex: feat(react): Add Select Component
```


### 1. Type
커밋 타입은 다음 중 하나입니다.
- feat: A new feature
- fix: A bug fix
- refactor: A code change that neither fixes a bug nor adds a feature
- test: Adding missing tests or correcting existing tests
- docs: Documentation only changes

<br />

### 2. Package Scope
- 작업을 진행 한 패키지 명입니다.
  - react
  - utils

<br />

### 3. Descriptions
- 작업한 변경 사항에 대한 요약 설명입니다.

<br />