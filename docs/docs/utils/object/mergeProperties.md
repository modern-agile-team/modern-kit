# mergeProperties

기준이 되는 target 객체와 source 객체의 프로퍼티를 병합하는 유틸 함수입니다.

Key가 동일할 때 값이 원시 타입의 경우 source의 값으로 덮어씌워지며, 배열인 경우 target과 source 요소를 모두 갖는 배열을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mergeProperties/index.ts)

## Interface
```ts title="typescript"
const mergeProperties: <
  T extends Record<PropertyKey, any>,
  K extends Record<PropertyKey, any>
>(
  source: T,
  target: K,
  excludedKeys?: (keyof K)[] | undefined
) => T & K;
```

## Usage
### Default
```ts title="typescript"
import { mergeProperties } from '@modern-kit/utils';

const target = {
  a: 1,
  c: [1],
  d: { foo: 1 },
};
const source = {
  b: 2,
  c: [2],
  d: { bar: 2 }
};

const obj = mergeProperties(target, source);
// { a: 1, b: 2, c: [1, 2 ], d: { foo: 1, bar: 2 }}
```

### ExcludedKeys
```ts title="typescript"
import { mergeProperties } from '@modern-kit/utils';

const target = {
  a: 1,
  b: 2,
};
const source = {
  c: 3,
  d: 4,
};

const obj = mergeProperties(target, source, ['c']);
// { a: 1, b: 2, d: 4 }
```