# sum

Returns the `sum` of array elements.

By default, it returns the sum of a `number array`. For arrays of other types, the `sum` can be determined by the result of the second argument `iteratee` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/sum/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/sum | 21,825,119.56 | 0.0000 | `fastest` |
| lodash/sum | 7,861,063.97 | 0.0001 | - |

- **modern-kit/sum**
  - `2.78x` faster than lodash/sum

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/sum with iteratee | 15,978,576.34 | 0.0001 | `fastest` |
| lodash/sumBy | 4,471,676.86 | 0.0002 | - |

- **modern-kit/sum with iteratee**
  - `3.57x` faster than lodash/sumBy

<br />

## Interface
```ts title="typescript"
// Function overloading
function sum(arr: number[] | readonly number[]): number;

function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

<br />

## Usage
### Default
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
const result = sum(arr); // 15
```

<br />

### Iteratee
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
const result = sum(arr, (item) => item.value); // 15
```
