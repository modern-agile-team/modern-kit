# max

A function that returns the `maximum value` from an array.

If an `iteratee` function is provided, it transforms each element of the array based on the `iteratee` function and returns the item with the maximum value.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/max/index.ts)

<br />

## Interface
```ts title="typescript"
// Function overloading
function max(arr: number[] | readonly number[]): number;

function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;
```

<br />

## Usage
### Default
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr = [5, 2, 9, 1, 5, 6];
const result = max(arr); // 9
```

<br />

### Iteratee
```ts title="typescript"
import { max } from '@modern-kit/utils';

const arr = [
  { value: 5 },
  { value: 2 },
  { value: 9 },
  { value: 1 },
  { value: 5 },
  { value: 6 },
];
const result = max(arr, (item) => item.value); // { value: 9 }
```
