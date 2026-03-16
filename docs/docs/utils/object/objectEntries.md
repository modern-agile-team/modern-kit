# objectEntries

`Object.entries()`와 동일하게 동작하지만 `key` 타입을 지켜주는 함수입니다.
이때, `symbol` 프로퍼티는 열거형이 아니기 때문에 제외됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/objectEntries/index.ts)

<br />

## Interface
```ts title="typescript"
type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;

function objectEntries<T extends Record<PropertyKey, any>>(
  obj: T
): [ObjectKeys<T>, T[ObjectKeys<T>]][];
```

<br />

## Usage
```ts title="typescript"
import { objectEntries } from '@modern-kit/utils';

const symbol = Symbol('d');
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 4,
} as const;

 /**
  * type: ["a" | "b" | "c", 1 | 2 | 3][]
  * value:
    [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]
  */
const entries = objectEntries(obj);
```

## Note
- [Object.entries() - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
