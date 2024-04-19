# objectValues

A function that works the same as `Object.values()`.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const objectValues: <T extends Record<PropertyKey, T[keyof T]>>(
  obj: T
) => T[ObjectKeys<T>][];
```

## Usage
```ts
import { objectValues } from '@modern-kit/utils';

const symbol = Symbol('d');
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [symbol]: 4,
} as const;

 /**
  * type: (1 | 2 | 3)[]
  * value: [1, 2, 3]
  */
const values = objectValues(obj);
```

## Note
[Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)