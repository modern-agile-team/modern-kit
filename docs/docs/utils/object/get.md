# get

주어진 객체에서 지정된 경로에 해당하는 값을 타입 안전하게 반환하는 함수입니다.
점 표기법(dot notation)을 사용하여 중첩된 객체의 깊은 속성에 접근할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/get/index.ts)

<br />

## Interface
```ts title="typescript"
function get<T extends Record<PropertyKey, any>, K extends PropertyPath<T>>(
  obj: T,
  path: K,
  defaultValue?: GetByPath<T, K>
): GetByPath<T, K>;
```
- [GetByPath 타입 참고](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/GetByPath/index.ts)
- [PropertyPath 타입 참고](https://github.com/modern-agile-team/modern-kit/blob/main/packages/types/src/PropertyPath/index.ts)

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { get } from '@modern-kit/utils';

const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };

// 단일 속성 접근
get(obj, 'a'); // { b: { c: 1 } }

// 중첩 속성 접근
get(obj, 'a.b'); // { c: 1 }
get(obj, 'a.b.c'); // 1
```

<br />

### 옵셔널 속성 접근
```ts title="typescript"
const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

// 옵셔널 속성 접근
get(obj, 'a.b');
// value: { c: 1 }
// type: { c: 1 } | undefined

get(obj, 'a.b?.c');
// value: 1
// type: 1 | undefined
```

<br />

### 기본값 설정
```ts title="typescript"
const obj: { a?: { b?: { c?: number } } } = {};

get(obj, 'a', { b: { c: 1 } }); // { b: { c: 1 } }
get(obj, 'a?.b', { c: 1 }); // { c: 1 }
get(obj, 'a?.b?.c', 1); // 1
```
