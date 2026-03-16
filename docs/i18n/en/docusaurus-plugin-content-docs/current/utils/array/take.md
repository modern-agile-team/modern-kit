# take

Returns a new array containing the first n elements of the array.

If no additional argument is provided, returns a new array containing only the first element.

If the count to take is greater than the array length, returns the entire array.

If the count to take is negative, returns an empty array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/take/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/take | 6,771,043.43 | 0.0001 | `fastest` |
| lodash/take | 2,601,105.35 | 0.0004 | `slowest` |

- **modern-kit/take**
  - `2.60x` faster than lodash/take

<br />

## Interface

```ts title="typescript"
function take<T>(arr: T[] | readonly T[], count: number = 1): T[]
```

<br />

## Usage

```ts title="typescript"
import { take } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(take(arr)); // [1]
console.log(take(arr, 0)); // []
console.log(take(arr, 2)); // [1, 2]
console.log(take(arr, 7)); // [1, 2, 3, 4, 5]
```
