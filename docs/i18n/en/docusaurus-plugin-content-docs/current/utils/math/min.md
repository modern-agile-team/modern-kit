# min

A function that returns the `minimum value` from an array.

If an `iteratee` function is provided, it transforms each element of the array based on the `iteratee` function and returns the item with the minimum value.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/min/index.ts)

<br />

## Interface
```ts title="typescript"
// Function overloading
function min(arr: number[] | readonly number[]): number;

function min<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;
```

<br />

## Usage
### Default
```ts title="typescript"
import { min } from '@modern-kit/utils';

const arr = [5, 2, 9, 1, 5, 6];
const result1 = min(arr); // 1
```

<br />

### Iteratee
```ts title="typescript"
import { min } from '@modern-kit/utils';

const arr = [
  { value: 5 },
  { value: 2 },
  { value: 9 },
  { value: 1 },
  { value: 5 },
  { value: 6 },
];
const result = min(arr, (item) => item.value); // { value: 1 }
```
