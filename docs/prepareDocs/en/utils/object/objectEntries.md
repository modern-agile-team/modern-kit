# objectEntries

a function that works the same as `Object.entries()`, but protects the key type.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const objectEntries: <T extends Record<PropertyKey, T[keyof T]>>(
  obj: T
) => [ObjectKeys<T>, T[ObjectKeys<T>]][];
```

## Usage
```ts
import { objectEntries } from '@devgrace/utils';

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
[Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)