# drop

Returns a new array with the first n elements removed from the array.

If no additional argument is provided, returns a new array with only the first element removed.

If the count to remove is greater than the array length, returns an empty array.

If the count to remove is negative, returns the original array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/drop/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/drop | 7,920,294.48 | 0.0001 | `fastest` |
| lodash/drop | 2,854,814.00 | 0.0004 | `slowest` |

- **modern-kit/drop**
  - `2.77x` faster than lodash/drop

<br />

## Interface

```ts title="typescript"
function drop<T>(arr: T[], count: number = 1): T[]
```

<br />

## Usage

```ts title="typescript"
import { drop } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(drop(arr)); // [2, 3, 4, 5]
console.log(drop(arr, 0)); // [1, 2, 3, 4, 5]
console.log(drop(arr, 2)); // [3, 4, 5]
console.log(drop(arr, 7)); // []
```
