# unset

객체의 특정 경로에 해당하는 속성을 삭제하고 새로운 객체를 반환합니다.

`get`, `set` 과 동일한 점 표기법(dot notation) 경로를 사용하며, 주어진 객체의 타입에 옵셔널 프로퍼티가 있는 경우 옵셔널(?) 경로로 접근해야 합니다.

경로 중간의 값이 없거나 객체가 아니라면 아무것도 삭제하지 않고 반환합니다.

기본적으로 원본 객체를 변경하지 않으며(`immutable: true`), `immutable: false` 옵션을 주면 원본 객체에서 직접 삭제합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/unset/index.ts)

## Interface
```ts title="typescript"
function unset<
  T extends Record<string, unknown>,
  P extends PropertyPath<T>
>(obj: T, path: P, options?: { immutable?: boolean }): T;
```

<br />

## Usage
### 기본 사용
```ts title="typescript"
import { unset } from '@modern-kit/utils';

const obj = { a: { b: 1, c: 2 } };

unset(obj, 'a.b');
// { a: { c: 2 } }
// obj: { a: { b: 1, c: 2 } } (원본 유지)
```

### 옵셔널 경로
```ts title="typescript"
import { unset } from '@modern-kit/utils';

// 경로 중간의 값이 없으면 그대로 반환합니다.
const obj: { a?: { b?: number } } = {};

unset(obj, 'a?.b');
// {}
```

### 원본 객체 직접 변경
```ts title="typescript"
import { unset } from '@modern-kit/utils';

const obj = { a: { b: 1, c: 2 } };

unset(obj, 'a.b', { immutable: false });
// obj: { a: { c: 2 } }
```
