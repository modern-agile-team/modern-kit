# 테스트 작성 규칙

CLAUDE가 참고해야하는 테스트 실행 환경 및 전역 객체 모킹 규칙입니다.
기본 구조·설명 문구 규칙은 `CLAUDE.md`의 `Testing Conventions`를 따릅니다.

---

## 실행 환경

| 패키지              | 기본 environment | pool        |
| ------------------- | ---------------- | ----------- |
| `@modern-kit/react` | `happy-dom`      | `vmThreads` |
| `@modern-kit/utils` | `node`           | `vmThreads` |
| `@modern-kit/types` | `node`           | `vmThreads` |

- DOM 환경은 `happy-dom` 을 사용합니다. `jsdom` 으로 바꾸지 않습니다.
- utils 는 실제 DOM API(`document`, `localStorage`, `getComputedStyle` 등)가 필요한 파일에만 **첫 줄**에 docblock 을 추가합니다.

  ```ts title="typescript"
  // @vitest-environment happy-dom
  ```

- `window` 를 가짜 객체로 대체하는 테스트는 DOM 환경이 필요 없으므로 docblock 을 붙이지 않습니다.
- happy-dom 이 브라우저와 다르게 동작하면, 환경 구현에 기대지 말고 테스트 대상이 실제로 호출하는 레이어를 모킹합니다. (예: `Storage.prototype` 대신 `StorageManager.prototype` spy)
- vm 방식 pool 에서는 vm 컨텍스트와 Node 내장/네이티브 모듈의 전역 객체가 달라 `instanceof` 비교가 어긋날 수 있습니다.
- 테스트는 pool 과 관계없이(`forks`, `vmThreads`, `vmForks` 등) 통과하도록 작성합니다.

---

## 전역 객체 모킹

### 금지

전역 상태를 원래대로 되돌리지 못해 다른 테스트에 영향을 줍니다.

```ts title="typescript"
// ❌
Object.defineProperty(window, 'matchMedia', { value: mockFn });
Object.defineProperty(globalThis, 'window', { value: undefined });
globalThis.window = undefined as any;
delete globalThis.window;
vi.spyOn(window, 'window', 'get');
```

- 테스트 안에서 새로 만든 객체(이벤트 객체 등)에 `Object.defineProperty` 를 쓰는 것은 괜찮습니다.

### 사용: `vi.stubGlobal` + `vi.unstubAllGlobals`

```ts title="typescript"
beforeEach(() => {
  vi.stubGlobal('matchMedia', vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
});
```

- `vi.stubGlobal` 을 쓰면 반드시 `afterEach` 에서 `vi.unstubAllGlobals()` 를 호출합니다.
- 기존 메서드의 호출 여부만 확인할 때는 `vi.spyOn(window, 'addEventListener')` 를 사용해도 됩니다.

---

## 서버(SSR) 환경 테스트

`window` 를 직접 조작하지 않고, 케이스에 맞는 방법을 사용합니다.

| 케이스                                                        | 방법                                                         |
| ------------------------------------------------------------- | ------------------------------------------------------------ |
| `window` 를 가짜 객체로 대체해도 되는 경우 (utils)            | `node` 환경에서 `vi.stubGlobal('window', ...)` 로 주입       |
| DOM API 가 필요하면서 서버 케이스도 있는 경우                 | `isClient` / `isServer` 를 `vi.mock` 으로 모킹               |
| 구현이 `typeof window` 를 직접 확인하고, 나머지는 DOM 이 필요 | 서버 케이스만 `[feature].server.spec.ts` 로 분리 (node 환경) |
| import 시점에 환경을 판별하는 모듈 (react)                    | `vi.doMock` + `vi.resetModules` 후 모듈을 다시 import        |

```ts title="typescript"
// node 환경에서 window 주입
it('서버 환경에서는 "server"를 반환해야 합니다', () => {
  vi.stubGlobal('window', undefined);
  expect(getOS()).toBe('server');
});

// 환경 판별 함수 모킹
vi.mock('../../device', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../device')>()),
  isClient: vi.fn(() => true),
}));

it('클라이언트 환경이 아닐 경우 에러를 발생시켜야 합니다', () => {
  vi.mocked(isClient).mockReturnValueOnce(false);
  expect(() => rem(16)).toThrowError();
});
```

- 케이스별 반환값 변경은 `mockReturnValueOnce` 를 사용합니다. (setup 의 `vi.resetAllMocks()` 는 `vi.fn(impl)` 의 기본 구현으로 되돌림)
- 모듈을 다시 import 할 때는 비교 대상(`react` 등)도 **같은 시점에 동적 import** 합니다.

```ts title="typescript"
const [{ useIsomorphicLayoutEffect }, react] = await Promise.all([
  import('.'),
  import('react'),
]);
expect(useIsomorphicLayoutEffect).toBe(react.useEffect);
```

---

## 비동기 단언

`rejects` / `resolves` 단언은 반드시 `await` 합니다. (Vitest v5 부터 `await` 하지 않으면 테스트 실패)

```ts title="typescript"
await expect(delay(-100)).rejects.toThrow('Invalid time value');
```

---

## 검증

- `yarn test:run` (패키지 디렉터리) — coverage + typecheck 포함
- 전역 객체를 다루는 테스트는 `yarn vitest run --pool=forks` 로도 통과하는지 확인
