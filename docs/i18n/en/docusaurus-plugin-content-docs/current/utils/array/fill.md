# fill

Fills an array with the specified value.

If start and end arguments are provided, only the elements within that index range are replaced with the specified value.

Unlike the native fill function, it does not modify the original array but returns a new array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/fill/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/fill | 7,944,868.54 | 0.0001 | `fastest` |
| js built-in/fill | 7,067,972.90 | 0.0001 | - |
| lodash/fill | 2,568,241.58 | 0.0004 | `slowest` |

- **modern-kit/fill**
  - `1.12x` faster than js built-in/fill
  - `3.09x` faster than lodash/fill

<br />

## Interface

```ts title="typescript"
function fill<T, U>(arr: T[] | readonly T[], target: U): U[];
function fill<T, U>(
  arr: T[] | readonly T[],
  target: U,
  start: number,
): (T | U)[];
function fill<T, U>(
  arr: T[] | readonly T[],
  target: U,
  start: number,
  end: number,
): (T | U)[]
```

<br />

## Usage

```ts title="typescript"
import { fill } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(fill(arr, 'a')); // ['a', 'a', 'a', 'a', 'a']
console.log(fill(arr, 'a', 2)); // [1, 2, 'a', 'a', 'a']
console.log(fill(arr, 'a', 2, 3)); // [1, 2, 'a', 'a', 5]
```
