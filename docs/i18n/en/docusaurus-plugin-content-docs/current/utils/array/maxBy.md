# maxBy

Finds the element that yields the maximum value when the `iteratee` function is applied to each element of the array.

- If multiple elements share the maximum value, the first one is returned.
- Returns `undefined` if the array is empty.
- If the `iteratee` returns `NaN` for an element, that element is returned immediately. (like built-in `Math.max`, `NaN` takes precedence)
- When a non-empty tuple type (`readonly [T, ...T[]]`) is passed, the return type is inferred as `T`.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/maxBy/index.ts)

<br />

## Interface

```ts title="typescript"
function maxBy<T>(
  items: readonly [T, ...T[]],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T;

function maxBy<T>(
  items: readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined;
```

<br />

## Usage

```ts title="typescript"
import { maxBy } from '@modern-kit/utils';

maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], (x) => x.a); // { a: 3 }
maxBy([] as { a: number }[], (x) => x.a); // undefined
maxBy([3, NaN, 1], (x) => x); // NaN

maxBy(
  [
    { name: 'john', age: 30 },
    { name: 'jane', age: 28 },
    { name: 'joe', age: 26 },
  ],
  (x) => x.age
); // { name: 'john', age: 30 }
```
