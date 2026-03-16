# objectEntries

Works the same as `Object.entries()` but preserves the `key` type.
Note that `symbol` properties are excluded since they are not enumerable.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/objectEntries/index.ts)

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
- [Object.entries() - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
