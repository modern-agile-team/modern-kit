# omit

a function that returns an object omitting the `keys` given as arguments. The returned object is `a new deeply copied object`.

`symbol` is excluded.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const omit: <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
) => Omit<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K>;
```

## Usage
```ts
import { omit } from '@devgrace/utils';

const symbol = Symbol('d');
const omittedObj1 = omit({ a: 1, b: 2, c: 3, [symbol]: 4 }, 'b'); // { a: 1, c: 3 }
const omittedObj1 = omit({ a: 1, b: 2, c: 3, d: 4, [symbol]: 4 }, ['a', 'd']); // { b: 2, c: 3 }
```