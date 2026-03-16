# chunk

A utility function that splits a given array into smaller arrays of a specified `size`.

Returns an empty array if `size === 0` or the array is empty. If `size <= array.length`, wraps the entire array in a single array and returns it.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/chunk/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/chunk | 5,176,276.00 | 0.0002 | `fastest` |
| lodash/chunk | 4,463,170.87 | 0.0002 | `slowest` |

- **modern-kit/chunk**
  - `1.16x` faster than lodash/chunk

<br />

## Interface

```ts title="typescript"
function chunk<T>(arr: T[] | readonly T[], size: number): T[][]
```

<br />

## Usage

```ts title="typescript"
import { chunk } from '@modern-kit/utils';

const array1 = [1, 2, 3, 4, 5];
const size1 = 2;
chunk(array1, size1); // [[1, 2], [3, 4], [5]]

const array2 = ['a', 'b', 'c', 'd'];
const size2 = 3;
chunk(array2, size2); // [['a', 'b', 'c'], ['d']]

const array3 = [1, 2, 3, 4];
const size3 = 5;
chunk(array3, size3); // [[1, 2, 3, 4]]

const array4 = [];
const size4 = 2;
chunk(array4, size4); // []
```
