# subtract

A function that sequentially `subtracts` the elements of an array.

If an `iteratee` function is provided, it transforms each element of the array based on the `iteratee` function and then performs subtraction.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/subtract/index.ts)

<br />

## Interface
```ts title="typescript"
// Function overloading
function subtract(arr: number[] | readonly number[]): number

function subtract<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

<br />

## Usage
### Default
```ts title="typescript"
import { subtract } from '@modern-kit/utils';

const result1 = subtract([10, 2, 3]); // 5
```

<br />

### Iteratee
```ts title="typescript"
import { subtract } from '@modern-kit/utils';

const result2 = subtract([{ value: 10 }, { value: 2 }, { value: 3 }], (item) => item.value); // 5
```
