# docs/types MD 파일 작성 포맷

CLAUDE가 참고해야하는 docs/types MD 파일 작성 포맷입니다.

---

## 전체 파일 구조

```md
# TypeName

타입에 대한 한 줄 설명.

세부 설명. 타입 파라미터, 제약 조건, 특이사항 등 언급.

<br />

## Interface

\`\`\`ts title="typescript"
type TypeName<
T extends SomeConstraint,
U = DefaultType

> = /_ 타입 정의 _/;
> \`\`\`

<br />

## Type Parameters (타입 파라미터 설명이 필요할 때)

| Name | Constraint       | Default       | Description   |
| ---- | ---------------- | ------------- | ------------- |
| `T`  | `SomeConstraint` | -             | 설명 (한국어) |
| `U`  | -                | `DefaultType` | 설명 (한국어) |

- Constraint: 타입 제약이 있으면 표기, 없으면 `-`
- Default: 기본값이 있으면 표기, 없으면 `-`

<br />

## Usage

### 기본 케이스 (단일 케이스라면 제외)

\`\`\`ts title="typescript"
import { TypeName } from '@modern-kit/types';

type Example = TypeName<SomeType>
// 결과 타입
\`\`\`

<br />

### 추가 케이스 제목 (있을 때)

\`\`\`ts title="typescript"
// 추가 예시
\`\`\`
```

<br />

## References (참고 링크가 있을 때)

- [참고 링크 1](https://example.com)
- [참고 링크 2](https://example.com)

<br />

---

## 섹션별 규칙

### 헤더 순서

1. `# TypeName` — H1 타입 이름 (PascalCase)
2. 타입 설명 (한국어 산문)
3. `## Interface` — TypeScript 타입 정의
4. `## Type Parameters` — 타입 파라미터 테이블 (파라미터가 복잡하거나 설명이 필요할 때)
5. `## Usage` — 사용 예시 코드

> **주의**: types 문서는 `## Code` GitHub 링크 섹션을 포함하지 않습니다.

### 코드 블록

- 언어: `ts` (TypeScript 타입만)
- title 속성 항상 포함: ` ```ts title="typescript" `

### 간격 규칙

- 설명이 두 문단 이상인 경우 문단 사이에 `<br />` 삽입
- `## Usage` 내 여러 케이스 사이에 `<br />` 삽입

### Type Parameters 테이블

- 타입 파라미터가 1개이고 단순하면 생략 가능 (Interface에서 충분히 파악 가능)
- 타입 파라미터가 2개 이상이거나 제약 조건/기본값이 있는 경우 작성
- Constraint: 타입 제약이 있으면 표기, 없으면 `-`
- Default: 기본값이 있으면 표기, 없으면 `-`

### Usage 예시 스타일

- 결과 타입을 주석으로 표기: `// { a: string; b: number }`
- 여러 케이스가 있을 때 `### 케이스 제목` 소제목으로 분리
- 케이스 사이에 `<br />` 삽입

### 언어 규칙

- 설명, 주석, 문서: **한국어(기본)** + **영어(번역본)** 모두 작성
- 코드, 타입, 변수명: 영어

---

## 파일 위치 및 i18n 구조

MD 파일을 작성할 때는 **한국어(기본)와 영어(번역본) 두 파일을 모두 작성**해야 합니다.

```
# 한국어 (기본 로케일)
docs/docs/types/[TypeName].md

# 영어 번역본
docs/i18n/en/docusaurus-plugin-content-docs/current/types/[TypeName].md
```

영어 번역본은 한국어 파일과 **동일한 구조**를 유지하며, 설명 텍스트만 영어로 작성합니다.
코드 블록, 섹션 헤더(`## Interface`, `## Usage` 등)는 그대로 유지합니다.

---

## 실제 구현 코드 참고 방법

아래 경로에 타입 구현 코드가 있습니다. 해당 코드를 읽고 Interface와 Usage 섹션을 작성해주세요.
JSDoc 주석(`@description`, `@template`, `@example`)에 작성된 내용을 참고해서 작성해주세요.

```
packages/types/src/[TypeName]/index.ts
```

---

## 파일 위치 패턴

types 문서는 utils와 달리 카테고리 없이 `docs/types/` 바로 아래에 단일 파일로 위치합니다.

```
packages/types/src/[TypeName]/index.ts      ← 구현 코드
docs/docs/types/[TypeName].md               ← 한국어 문서
docs/i18n/en/.../types/[TypeName].md        ← 영어 문서
```
