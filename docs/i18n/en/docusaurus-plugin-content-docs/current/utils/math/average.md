# average

A function that sums all elements of a number array and computes the `average`.

If an `iteratee` function is provided, the average is computed based on the return value of the `iteratee` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/average/index.ts)

<br />

## Interface
```ts title="typescript"
// Function overloading
function average(arr: number[] | readonly number[]): number;

function average<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

<br />

## Usage
### Default
```ts title="typescript"
import { average } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
const result = average(arr); // 3
```

<br />

### Iteratee
```ts title="typescript"
import { average } from '@modern-kit/utils';

const arr = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
const result = average(arr, (item) => item.value); // 3
```
