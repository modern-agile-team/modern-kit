# Contributing

<p>
  <a href="./CONTRIBUTING.md"><b>한국어</b></a> | <a href="./CONTRIBUTING.en.md">English</a>
</p>

`@modern-kit`은 개발자라면 누구든지 기여할 수 있습니다. 모든 기여에 감사드립니다! 🙏

<br />

## Issue

버그 제보나 개선 제안은 [GitHub Issue](https://github.com/modern-agile-team/modern-kit/issues)를 통해 남겨주세요.

- 버그 리포트에는 **재현 방법**과 **예상 동작**을 함께 작성해주시면 빠르게 처리할 수 있습니다.
- 새로운 기능 제안 시에는 **사용 사례**와 **기대 효과**를 함께 설명해주세요.

<br />

## Pull Request

Issue를 통해 제안하는 것 외에도, `@modern-kit`을 직접 fork하여 개선 작업을 수행한 후 Pull Request를 생성할 수 있습니다.

<br />

### 작업 전 체크리스트 🙏

- **새로운 기능**을 추가하는 경우, 먼저 Issue를 열어 논의해 주세요.
- 패키지 매니저는 **`yarn` (Berry v4+)** 을 사용해주세요.
- Node 버전은 **`v24 (LTS)`** 를 사용해주세요. `nvm`으로 쉽게 맞출 수 있습니다.

```shell
nvm install
nvm use
```

- PR 생성 전에 아래 명령어로 **lint**, **typecheck**, **test**를 모두 통과했는지 확인해주세요.

```shell
yarn eslint packages
yarn typecheck
yarn test
```

또는 통합 명령어 하나로 진행할 수 있습니다.

```shell
yarn build
```

<br />

### 문서 작업 📄

문서는 루트의 `docs` 폴더에서 관리하며, [Docusaurus](https://docusaurus.io/)를 기반으로 합니다.

- **한국어(기본)** 와 **영어** 두 파일을 모두 작성해야 합니다.

| 종류           | 경로                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| 한국어 훅 문서 | `docs/docs/react/hooks/useHookName.mdx`                                           |
| 영어 훅 문서   | `docs/i18n/en/docusaurus-plugin-content-docs/current/react/hooks/useHookName.mdx` |

- 문서 포맷은 기존 파일들을 참고해주세요. `.md`는 일반 문서, `.mdx`는 인터랙티브 예제가 포함된 문서에 사용합니다.
- MDX 예제 컴포넌트를 작성하려면 사전에 패키지 빌드가 필요합니다.

```shell
# 패키지 빌드 (MDX 예제 작성 전 필수)
yarn build
```

- 작업 중인 문서를 개발 서버에서 미리 확인할 수 있습니다.

```shell
# 한국어 문서 개발 서버
yarn start
yarn start:ko

# 영어 문서 개발 서버
yarn start:en
```

- PR 생성 전에 문서 빌드가 정상적으로 완료되어야 합니다.

```shell
yarn build:docs
```

<br />

## Conventional Commits

커밋 메시지는 아래 형식을 따릅니다.

```
<type>(<package scope>): <description>

예시:
feat(react): Add useToggle hook
fix(utils): Fix flatten edge case with empty arrays
docs(react): Add useIsClient documentation
```

<br />

### 1. Type

| Type       | 설명                                    |
| ---------- | --------------------------------------- |
| `feat`     | 새로운 기능 추가                        |
| `fix`      | 버그 수정 및 코드 개선                  |
| `refactor` | 기능 변경 없는 코드 리팩토링            |
| `test`     | 테스트 코드 추가 및 수정                |
| `docs`     | 문서 작업                               |
| `chore`    | 빌드 설정, 의존성 업데이트 등 기타 작업 |

<br />

### 2. Package Scope

작업한 패키지 이름을 명시합니다.

| Scope   | 대상             |
| ------- | ---------------- |
| `react` | `packages/react` |
| `utils` | `packages/utils` |
| `types` | `packages/types` |

<br />

### 3. Description

변경 사항을 간결하게 요약합니다. **영어 or 한국어**로 작성하며, 명령형 현재형으로 시작합니다. (예: `Add`, `Fix`, `Update`)

<br />
