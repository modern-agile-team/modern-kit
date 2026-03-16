# swap

Swaps the positions of two elements in an array, either mutating the original array or returning a new array depending on the options.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/swap/index.ts)

<br />

## Interface

```ts title="typescript"
function swap<T>(
  arr: T[] | readonly T[],
  i: number,
  j: number,
  options?: { immutable?: boolean }
): T[]
```

<br />

## Usage

### Basic Usage (mutates original array)

```ts title="typescript"
import { swap } from '@modern-kit/utils';

const arr = [1, 2, 3];
swap(arr, 0, 2); // [3, 2, 1]
console.log(arr); // [3, 2, 1] (original array is mutated)
```

<br />

### immutable option (returns new array)

```ts title="typescript"
import { swap } from '@modern-kit/utils';

const arr = [1, 2, 3];
const newArr = swap(arr, 0, 2, { immutable: true }); // [3, 2, 1]
console.log(arr);    // [1, 2, 3] (original array preserved)
console.log(newArr); // [3, 2, 1] (new array returned)
```
