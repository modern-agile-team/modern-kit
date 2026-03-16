# set

객체의 특정 경로를 업데이트하고 새로운 객체를 반환합니다.

`점 표기법(dot notation)`을 사용하여 중첩된 객체의 깊은 속성에 접근할 수 있습니다.
주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우, `옵셔널(?)` 경로로 접근해야 합니다.

`immutable` 옵션을 `true`로 설정하면, 원본 객체를 수정하지 않고 새로운 객체를 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/set/index.ts)

<br />

## Interface
```ts title="typescript"
export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends GetByPath<T, P>
>(obj: T, path: P, value: V, options?: { immutable?: boolean }): T;

export function set<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>,
  V extends (value: GetByPath<T, P>) => GetByPath<T, P>
>(obj: T, path: P, updater: V, options?: { immutable?: boolean }): T;
```
- [GetByPath 타입 참고](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/GetByPath/index.ts)
- [PropertyPath 타입 참고](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/PropertyPath/index.ts)

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { set } from '@modern-kit/utils';

const obj: { a: { b: number } } = { a: { b: 1 } };

set(obj, 'a.b', 2); // obj: { a: { b: 2 } }

// updater 함수를 사용하여 업데이트
set(obj, 'a.b', (value) => value + 1); // obj: { a: { b: 3 } }
```

<br />

### 옵셔널 속성 접근
```ts title="typescript"
const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

set(obj, 'a.b?.c', 2); // obj: { a: { b: { c: 2 } } }

// updater 함수를 사용하여 업데이트
set(obj, 'a.b', (value) => value + 1); // obj: { a: { b: { c: 3 } } }
```

<br />

### 불변하게 업데이트하는 경우
```ts title="typescript"
const originalObj: { a: { b: number } } = { a: { b: 1 } };
const updatedObj = set(originalObj, 'a.b', 2, { immutable: true });
// originalObj: { a: { b: 1 } }
// updatedObj: { a: { b: 2 } }
```
