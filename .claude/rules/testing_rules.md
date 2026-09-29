# 테스트 작성 규칙

CLAUDE가 참고해야하는 테스트 실행 환경 및 작성 규칙입니다.
기본 구조·설명 문구 규칙은 `CLAUDE.md`의 `Testing Conventions`를 따르고, 이 문서는 **실행 환경과 전역 객체 모킹**을 다룹니다.

---

## 패키지별 실행 환경

| 패키지              | 기본 environment | pool      | 설정 파일                          |
| ------------------- | ---------------- | --------- | ---------------------------------- |
| `@modern-kit/react` | `happy-dom`      | `vmForks` | `packages/react/vitest.config.mts` |
| `@modern-kit/utils` | `node`           | `vmForks` | `packages/utils/vitest.config.mts` |

### utils: 기본은 `node`, DOM 이 필요할 때만 `happy-dom`

utils 는 대부분 DOM 이 필요 없는 순수 함수이므로 기본 환경이 `node` 입니다.
`document`, `localStorage`, `getComputedStyle`, DOM `Node` 처럼 **실제 브라우저 API 가 필요한 테스트만** 파일 첫 줄에 docblock 을 추가합니다.

```ts title="typescript"
// @vitest-environment happy-dom
import { describe, it, expect } from 'vitest';
```

- docblock 은 반드시 **파일 최상단(첫 줄)** 에 작성합니다.
- `window` 를 가짜 객체로 통째로 바꾸는 테스트는 DOM 환경이 필요 없습니다. `node` 환경에서 `vi.stubGlobal('window', ...)` 를 사용합니다. (아래 참고)
- 기본 환경을 DOM 환경으로 되돌리지 않습니다. (DOM 환경 준비 비용 때문에 테스트 시간이 약 10배 늘어남)

### DOM 환경: `happy-dom`

DOM 환경은 `jsdom` 대신 `happy-dom` 을 사용합니다. (react 기본 환경, utils 의 docblock 지정 파일)

`happy-dom` 을 사용하는 이유는 다음과 같습니다.

- **vm 방식 pool 과 호환됩니다.** jsdom 은 vm 컨텍스트에서 `window` 가 `configurable: false` 인 실제 전역 객체가 되어 재정의·삭제가 불가능합니다. happy-dom 은 `window` 가 `configurable: true` 라, pool 설정 때문에 테스트 작성 방식이 제한되지 않습니다.
- **메모리를 적게 사용합니다.** vm 방식 pool 은 워커가 처리한 파일 수만큼 메모리가 누적되는데, happy-dom 은 jsdom 대비 약 25% 적게 사용합니다. (react 병렬 실행 기준 워커당 최대 172MB → 131MB, 파일당 약 7MB → 5MB)
- **환경 준비가 가볍습니다.** happy-dom 은 테스트에 필요한 DOM API 위주로 구현된 가벼운 라이브러리라, `forks` 처럼 파일마다 환경을 새로 만드는 pool 에서 jsdom 보다 약 18% 빠릅니다. (react 9.85s → 8.1s) vm 방식 pool 에서는 비슷합니다.
- **라이브러리 테스트 용도로 충분합니다.** 이 저장소의 테스트는 DOM 조작·이벤트·Storage 등 기본 API 만 사용하므로, jsdom 의 넓은 표준 구현 범위가 필요하지 않습니다.

> happy-dom 이 브라우저와 다르게 동작하는 API 가 있으면, 환경의 구현에 기대지 말고 테스트 대상이 실제로 호출하는 레이어를 모킹합니다. (예: `Storage.prototype` 대신 `StorageManager.prototype` spy)

### pool: `vmForks`

`vmForks` 는 자식 프로세스(워커)를 재사용하면서 테스트 파일마다 `vm` 컨텍스트(새 전역 객체)를 만들어 실행합니다. 파일마다 프로세스를 새로 띄우는 `forks` 대비 약 3배 빠릅니다.

- `vmThreads` 와 속도 차이는 5% 내외로 거의 없으며, 워커가 스레드가 아닌 프로세스라 네이티브 모듈·`process.chdir()` 등 스레드 관련 호환성 문제가 없어 `vmForks` 를 사용합니다.

vm 방식 pool(`vmForks`, `vmThreads`) 에는 다음 제약이 있습니다.

- DOM 환경을 `jsdom` 으로 바꾸면 **`window` 를 재정의·삭제할 수 없습니다.** (jsdom 의 `window` 는 컨텍스트의 실제 전역 객체이며 `configurable: false`. happy-dom 은 재정의 가능)
- vm 컨텍스트와 Node 내장/네이티브 모듈은 서로 다른 전역 객체(`Array`, `Error` 등)를 사용하므로, 둘 사이의 `instanceof` 비교가 어긋날 수 있습니다.
- **워커가 처리한 파일 수만큼 메모리가 누적됩니다.** (DOM 환경 파일당 약 5MB, 병렬 실행 시 워커당 최대 약 130MB 수준)
  - 테스트 파일이 크게 늘어 CI 에서 메모리 문제가 생기면 `vmMemoryLimit` 으로 워커 재시작 기준을 지정합니다. (예: `vmMemoryLimit: '512MB'`)

테스트는 pool 과 관계없이(`forks`, `threads`, `vmForks`, `vmThreads`) 통과하도록 작성합니다.

---

## 전역 객체 모킹 규칙

### 금지 패턴

아래 패턴은 전역 상태를 원래대로 되돌리지 못해 다른 테스트에 영향을 주거나, DOM 환경(jsdom)·pool 에 따라 `Cannot redefine property` 에러를 일으킵니다. 현재 설정(happy-dom)에서 동작하더라도 사용하지 않습니다.

```ts title="typescript"
// ❌ configurable/writable 기본값이 false 라 되돌릴 수 없는 속성이 됨
Object.defineProperty(window, 'matchMedia', { value: mockFn });

// ❌ 복구가 보장되지 않고, jsdom + vm 방식 pool 에서는 재정의·삭제 자체가 불가
Object.defineProperty(globalThis, 'window', { value: undefined });
globalThis.window = undefined as any;
delete globalThis.window;
vi.spyOn(window, 'window', 'get');
```

### 전역 값 교체: `vi.stubGlobal`

```ts title="typescript"
beforeEach(() => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 600px)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
});

afterEach(() => {
  vi.unstubAllGlobals(); // 반드시 원래 값으로 복구
});
```

- `vi.stubGlobal` 을 사용하면 반드시 `afterEach` 에서 `vi.unstubAllGlobals()` 를 호출합니다.
- 기존 메서드의 호출 여부만 확인할 때는 `vi.spyOn(window, 'addEventListener')` 를 그대로 사용해도 됩니다.

---

## 서버(SSR) 환경 테스트

`window` 가 없는 서버 환경은 케이스에 따라 아래 방법 중 하나로 흉내냅니다.

### 1. utils — `node` 환경에서 window 주입

`window` 를 가짜 객체로 대체해도 되는 경우(`isServer`, `getOS`, `getViewportSize` 등)는 DOM 환경 없이 `node` 환경에서 테스트합니다.

```ts title="typescript"
afterEach(() => {
  vi.unstubAllGlobals();
});

it('클라이언트 환경에서는 OS를 반환해야 합니다', () => {
  vi.stubGlobal('window', { navigator: { userAgent: 'iPhone' } });
  expect(getOS()).toBe('ios');
});

it('서버 환경에서는 "server"를 반환해야 합니다', () => {
  vi.stubGlobal('window', undefined);
  expect(getOS()).toBe('server');
});
```

### 2. DOM 환경이 필요한 경우 — 환경 판별 함수 모킹

DOM API 가 필요하면서 서버 케이스도 있다면, `window` 대신 `isClient` / `isServer` 를 모킹합니다.

```ts title="typescript"
import { isClient } from '../../device';

vi.mock('../../device', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../device')>()),
  isClient: vi.fn(() => true),
}));

it('클라이언트 환경이 아닐 경우 에러를 발생시켜야 합니다', () => {
  vi.mocked(isClient).mockReturnValueOnce(false);
  expect(() => rem(16)).toThrowError();
});
```

- setup 파일의 `vi.resetAllMocks()` 는 `vi.fn(impl)` 로 전달한 기본 구현으로 되돌리므로, 케이스별 변경은 `mockReturnValueOnce` 를 사용합니다.

### 3. 구현이 `typeof window` 를 직접 확인하는 경우 — 서버 케이스 파일 분리

모킹할 함수 없이 구현이 `window` 존재 여부를 직접 확인하고, 나머지 테스트는 DOM 환경이 필요한 경우 서버 케이스만 `[feature].server.spec.ts` 로 분리해 `node` 환경에서 실행합니다.

```
storage/storageManager/
  storageManager.spec.ts         # // @vitest-environment happy-dom
  storageManager.server.spec.ts  # node 환경 (docblock 없음)
```

### 4. 모듈 평가 시점에 환경을 판별하는 경우 (react)

`useIsomorphicLayoutEffect` 처럼 import 시점에 환경을 판별하는 모듈은 `vi.doMock` + `vi.resetModules` 로 매 테스트마다 모듈을 다시 불러옵니다.
비교 대상(`react`)도 **같은 시점에 동적 import** 해야 동일한 인스턴스가 보장됩니다.

```ts title="typescript"
afterEach(() => {
  vi.doUnmock('@modern-kit/utils');
  vi.resetModules();
});

it('서버 환경에서는 useEffect를 사용해야 합니다', async () => {
  vi.doMock('@modern-kit/utils', async (importOriginal) => ({
    ...(await importOriginal<typeof import('@modern-kit/utils')>()),
    isClient: () => false,
  }));

  const [{ useIsomorphicLayoutEffect }, react] = await Promise.all([
    import('.'),
    import('react'),
  ]);

  expect(useIsomorphicLayoutEffect).toBe(react.useEffect);
});
```

---

## 비동기 단언

Vitest v5 부터 `await` 하지 않은 `rejects` / `resolves` 단언은 에러로 처리됩니다.

```ts title="typescript"
// ❌
expect(delay(-100)).rejects.toThrow('Invalid time value');

// ✅
await expect(delay(-100)).rejects.toThrow('Invalid time value');
```

---

## 검증

테스트를 추가·수정한 뒤에는 다음을 확인합니다.

- `yarn test:run` (패키지 디렉터리) — coverage + typecheck 포함
- 전역 객체를 다루는 테스트라면 `yarn vitest run --pool=forks` 로 다른 pool 에서도 통과하는지 확인
