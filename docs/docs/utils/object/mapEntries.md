# mapEntries

주어진 객체의 각 key와 value를 주어진 `iteratee` 함수 결과에 따라 함께 변환하여 새로운 객체를 반환합니다.

`iteratee` 는 `[새 key, 새 value]` 튜플을 반환해야 하며, 변환된 key 가 겹치면 나중에 순회한 값으로 덮어씁니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapEntries/index.ts)

## Interface
```ts title="typescript"
function mapEntries<
  T extends Record<PropertyKey, any>,
  K extends PropertyKey,
  V,
>(
  obj: T,
  iteratee: (iterateData: {
    key: keyof T;
    value: T[keyof T];
    obj: T;
  }) => readonly [K, V]
): Record<K, V>;
```

<br />

## Usage
```ts title="typescript"
import { mapEntries } from '@modern-kit/utils';

const obj = { a: 1, b: 2, c: 3 };

mapEntries(obj, ({ key, value }) => [key.toUpperCase(), value * 10]);
// { A: 10, B: 20, C: 30 }

const roles = { fred: 'admin', pebbles: 'guest' } as const;

mapEntries(roles, ({ key, value }) => [value, key]);
// { admin: 'fred', guest: 'pebbles' }
```
