# docs/utils MD 파일 작성 포맷

CLAUDE가 참고해야하는 docs/utils MD 파일 작성 포맷입니다.

---

## 전체 파일 구조

```md
# functionName

함수에 대한 한 줄 설명.

세부 설명. 주요 동작 방식, 특이사항 등 언급.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/[category]/[functionName]/index.ts)

## Benchmark (벤치마크 데이터가 있을 때만)

- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/functionName | 숫자 | 숫자 | `fastest` |
| 비교 대상 | 숫자 | 숫자 | - |

- **modern-kit/functionName**
  - `Nx` faster than [비교 대상]

## Interface

\`\`\`ts title="typescript"
function functionName<T>(
  param: ParamType,
  options?: OptionsType
): ReturnType;
\`\`\`

## Parameters (파라미터가 있을 때)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `param` | `ParamType` | - | 설명 (한국어) |
| `options` | `OptionsType` | `{}` | 설명 (한국어) |

## Returns (반환값 설명이 필요할 때)

| Type | Description |
| --- | --- |
| `ReturnType` | 설명 (한국어) |

## Usage

### 기본 사용법

\`\`\`ts title="typescript"
import { functionName } from '@modern-kit/utils';

// 예시 코드
\`\`\`

### 추가 사용 패턴 제목 (있을 때)

\`\`\`ts title="typescript"
// 추가 예시 코드
\`\`\`
```

---

## 섹션별 규칙

### 헤더 순서

1. `# functionName` — H1 함수 이름 (camelCase)
2. 함수 설명 (한국어 산문)
3. `## Code` — GitHub 링크
4. `## Benchmark` — 벤치마크 테이블 (데이터가 있을 때만)
5. `## Interface` — TypeScript 시그니처
6. `## Parameters` — 파라미터 테이블 (파라미터 설명이 필요할 때)
7. `## Returns` — 반환값 설명 (반환값이 복잡하거나 설명이 필요할 때)
8. `## Usage` — 사용 예시 코드

### 코드 블록

- 언어: `ts` (React 없는 순수 TypeScript)
- title 속성 항상 포함: ` ```ts title="typescript" `

### 간격 규칙

- 설명이 두 문단 이상인 경우 `<br />` 삽입
- 주요 섹션 사이에는 빈 줄로 구분 (별도 `<br />` 불필요)
- 단, `## Code` 바로 뒤에는 `<br />` 없이 `## Interface`와 붙여씀

### Benchmark 섹션

- 벤치마크 파일(`*.bench.ts`)이 존재하는 함수에만 추가
- hz(초당 작업 수), mean(평균 응답 시간ms) 기재
- 가장 빠른 항목에 `fastest`, 가장 느린 항목에 `slowest` 표기
- modern-kit 구현이 얼마나 빠른지 배율로 표기

### Parameters / Returns 테이블

- 파라미터가 1~2개로 단순하면 생략 가능 (Interface에서 충분히 파악 가능)
- 파라미터가 Options 객체이거나 설명이 필요한 경우 작성
- Default: 기본값이 있으면 표기, 없으면 `-`

### GitHub 링크 경로 패턴

```
https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/[category]/[functionName]/index.ts
```

### 언어 규칙

- 설명, 주석, 문서: **한국어(기본)** + **영어(번역본)** 모두 작성
- 코드, 타입, 변수명: 영어

---

## 파일 위치 및 i18n 구조

MD 파일을 작성할 때는 **한국어(기본)와 영어(번역본) 두 파일을 모두 작성**해야 합니다.

```
# 한국어 (기본 로케일)
docs/docs/utils/[category]/[functionName].md

# 영어 번역본
docs/i18n/en/docusaurus-plugin-content-docs/current/utils/[category]/[functionName].md
```

영어 번역본은 한국어 파일과 **동일한 구조**를 유지하며, 설명 텍스트만 영어로 작성합니다.
코드 블록, 섹션 헤더(`## Code`, `## Interface`, `## Benchmark`, `## Usage` 등), GitHub 링크는 그대로 유지합니다.

## 실제 구현 코드 참고 방법

아래 경로에 함수 구현 코드가 있습니다. 해당 코드를 읽고 Interface와 Usage 섹션을 작성해주세요.
JSDoc 주석(`@description`, `@param`, `@returns`, `@example`, `@throws`)에 작성된 내용을 참고해서 작성해주세요.

```
packages/utils/src/[category]/[functionName]/index.ts
```

벤치마크 데이터가 있는지 확인하려면 아래 경로를 확인하세요.

```
packages/utils/src/[category]/[functionName]/[functionName].bench.ts
```

---

## 카테고리 목록

| 카테고리 | 경로 |
| --- | --- |
| `array` | `docs/utils/array/` |
| `clipboard` | `docs/utils/clipboard/` |
| `common` | `docs/utils/common/` |
| `date` | `docs/utils/date/` |
| `device` | `docs/utils/device/` |
| `file` | `docs/utils/file/` |
| `formatter` | `docs/utils/formatter/` |
| `math` | `docs/utils/math/` |
| `number` | `docs/utils/number/` |
| `object` | `docs/utils/object/` |
| `regex` | `docs/utils/regex/` |
| `storage` | `docs/utils/storage/` |
| `string` | `docs/utils/string/` |
| `style` | `docs/utils/style/` |
| `validator` | `docs/utils/validator/` |
