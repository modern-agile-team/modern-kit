# flattenDeep

A function based on **[flatten](https://modern-agile-team.github.io/modern-kit/docs/utils/array/flatten)** that flattens all depths of a given nested array.

Compared to JavaScript's built-in **[Array.prototype.flat(Infinity)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)**, it offers `superior performance` and `more accurate type inference`.

```ts title="typescript"
// as-is
// Array.prototype.flat(Infinity)
const arr = [1, [2, [3]]].flat(Infinity);
/*
 * const arr: FlatArray<number | (number | number[])[], 0 | 1 | 2 | 3 | -1 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20>[]
 */
```

```ts title="typescript"
// to-be
// flattenDeep
const arr = flattenDeep([1, [2, [3]]]);
/*
 * const arr: number[]
 */
```

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flattenDeep/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/flattenDeep | 2,028,846.09 | 0.0005 | `fastest` |
| lodash/flattenDeep | 1,481,161.98 | 0.0007 | - |
| js built-in/flat(Infinity) | 340,193.06 | 0.0029 | `slowest` |

- **modern-kit/flattenDeep**
  - `1.40x` faster than lodash/flattenDeep
  - `5.99x` faster than js built-in/flat(Infinity)

<br />

## Interface

```ts title="typescript"
/**
 * @description A utility type that recursively unwraps nested array types to extract the innermost element type
 */
type ExtractNestedArrayType<T> = T extends readonly (infer U)[] ? ExtractNestedArrayType<U> : T;
```

```ts title="typescript"
function flattenDeep<T>(arr: T[] | readonly T[]): ExtractNestedArrayType<T>[]
```

<br />

## Usage

```ts title="typescript"
import { flattenDeep } from '@modern-kit/utils';

const arr = [1, [2, [3, [4, [5]]]]];

flattenDeep(arr); // [1, 2, 3, 4, 5]
```
