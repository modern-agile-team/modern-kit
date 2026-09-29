# minBy

Finds the element that yields the minimum value when the `iteratee` function is applied to each element of the array.

- If multiple elements share the minimum value, the first one is returned.
- Returns `undefined` if the array is empty.
- If the `iteratee` returns `NaN` for an element, that element is returned immediately. (like built-in `Math.min`, `NaN` takes precedence)
- When a non-empty tuple type (`readonly [T, ...T[]]`) is passed, the return type is inferred as `T`.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/minBy/index.ts)

<br />

## Interface

```ts title="typescript"
function minBy<T>(
  items: readonly [T, ...T[]],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T;

function minBy<T>(
  items: readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined;
```

<br />

## Usage

```ts title="typescript"
import { minBy } from '@modern-kit/utils';

minBy([{ a: 1 }, { a: 2 }, { a: 3 }], (x) => x.a); // { a: 1 }
minBy([] as { a: number }[], (x) => x.a); // undefined
minBy([3, NaN, 1], (x) => x); // NaN

minBy(
  [
    { name: 'john', age: 30 },
    { name: 'jane', age: 28 },
    { name: 'joe', age: 26 },
  ],
  (x) => x.age
); // { name: 'joe', age: 26 }
```
