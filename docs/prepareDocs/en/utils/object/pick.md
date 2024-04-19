# pick

A function that returns an object consisting of the `keys` given as arguments. The returned object is `a new deeply copied object`.

`symbol` is excluded.

<br />

## Interface
```tsx
type ObjectKeys<T extends Record<PropertyKey, T[keyof T]>> = Exclude<
  keyof T,
  symbol
>;

const pick: <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
) => Pick<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K>;
```

## Usage
```ts
import { pick } from '@modern-kit/utils';

const pickedObj1 = pick({ a: 1, b: 2, c: 3 }, 'b'); // { b: 2 }
const pickedObj2 = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```