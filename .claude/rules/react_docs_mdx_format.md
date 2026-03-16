# docs/react MDX 파일 작성 포맷

CLAUDE가 참고해야하는 docs/react MDX 파일 작성 포맷입니다.

---

## 전체 파일 구조

```mdx
import { useHookName } from '@modern-kit/react';
// 필요한 React import 추가 (useState, useEffect 등)

# useHookName

훅에 대한 한 줄 설명 (한국어).

세부 설명 (한국어). `ref` 등 주요 옵션/특징 언급.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/react/src/hooks/useHookName/index.ts)

<br />

## Interface

\`\`\`ts title="typescript"
interface UseHookNameOptions {
optionA?: TypeA;
optionB?: TypeB;
}

function useHookName<T extends HTMLElement>(options?: UseHookNameOptions): {
ref: React.RefObject<T | null>;
// 반환값 나열
};
\`\`\`

<br />

### Options (옵션이 있을 때)

| Name      | Type    | Default  | Description   |
| --------- | ------- | -------- | ------------- |
| `optionA` | `TypeA` | `기본값` | 설명 (한국어) |
| `optionB` | `TypeB` | `기본값` | 설명 (한국어) |
| ...       | ...     | ...      | ...           |

<br />

### Returns (반환값이 있을 때)

| Name           | Type         | Description          |
| -------------- | ------------ | -------------------- |
| `returnValueA` | `ReturnType` | 반환값 설명 (한국어) |
| `returnValueB` | `ReturnType` | 반환값 설명 (한국어) |
| ...            | ...          | ...                  |

<br />

## Remarks (주의사항/참고사항이 있을 때)

:::caution 주의사항

- 주의사항 1
  - 세부 사항
- 주의사항 2
  :::

<br />

:::tip 팁 제목 (팁이 있을 때)

- 팁 내용
  :::

<br />

## Usage

### 기본 사용법 제목

\`\`\`tsx title="typescript"
import { useHookName } from '@modern-kit/react';

const Component = () => {
useHookName();

return <div>{/* ... */}</div>;
};
\`\`\`

<br />

### 추가 사용 패턴 제목

패턴 설명 (한국어).

\`\`\`tsx title="typescript"
// 코드 예시
\`\`\`

<br />

### Example (기본 인터랙티브 예제)

export const Example = () => {
  // 훅 사용
  return <div>{/* 인터랙티브 예제 UI */}</div>;
};

<Example />

<br />

### Example1 (추가 예제 1 제목)

예제 설명 (한국어).

export const Example1 = () => {
  // 훅 사용
  return <div>{/* 인터랙티브 예제 UI */}</div>;
};

<Example1 />

<br />

### Example2 (추가 예제 2 제목)

예제 설명.

export const Example2 = () => {
  // ...
};

<Example2 />
```

---

## 섹션별 규칙

### 헤더 순서

1. `import` 구문 (파일 최상단)
2. `# useHookName` - H1 훅 이름
3. 훅 설명 (한국어 산문)
4. `## Code` - GitHub 링크
5. `## Interface` - TypeScript 타입 시그니처
6. `### Options` - 옵션 테이블 (옵션이 있을 때)
7. `## Remarks` - 주의사항/팁 (있을 때)
8. `## Usage` - 코드 예제 섹션
9. `### Example`, `### Example1`, `### Example2`, ... - 인터랙티브 예제

### 코드 블록

- 언어: `tsx` (React 포함) 또는 `ts` (타입만)
- title 속성 항상 포함: ` ```tsx title="typescript" `

### Admonition (callout)

- `:::caution 주의사항` - 주의해야 할 사항
- `:::tip 팁 제목` - 유용한 팁

### 간격 규칙

- 주요 섹션 사이에 `<br />` 삽입
- Admonition 블록 전후에 `<br />`

### 인터랙티브 예제 패턴

- `export const Example = () => { ... }` — JSX export (default export 사용하지 않음)
- 컴포넌트 선언 후 바로 `<Example />` 로 렌더링
- 예제 안에 "🧪 테스트 방법" 안내 포함
- 예제 하단에 "💡 핵심:" 설명 박스 포함

### Options 테이블 컬럼

| Name | Type | Default | Description |

- Name: 백틱으로 감싼 옵션명
- Type: 백틱으로 감싼 타입
- Default: 기본값 (한국어 포함 가능)
- Description: 한국어 설명

### GitHub 링크 경로 패턴

```
https://github.com/modern-agile-team/modern-kit/blob/main/packages/react/src/hooks/[hookName]/index.ts
```

### 언어 규칙

- 설명, 주석, 문서: **한국어(기본)** + **영어(번역본)** 모두 작성
- 코드, 타입, 변수명: 영어

---

## 파일 위치 및 i18n 구조

MD/MDX 파일을 작성할 때는 **한국어(기본)와 영어(번역본) 두 파일을 모두 작성**해야 합니다.

```
# 한국어 (기본 로케일)
docs/docs/react/hooks/useHookName.mdx

# 영어 번역본
docs/i18n/en/docusaurus-plugin-content-docs/current/react/hooks/useHookName.mdx
```

영어 번역본은 한국어 파일과 **동일한 구조**를 유지하며, 설명 텍스트만 영어로 작성합니다.
코드 블록, 섹션 헤더(`## Code`, `## Interface`, `## Remarks`, `## Usage` 등), 파일 경로는 그대로 유지합니다.
