# mapRight

A function that iterates over each element of the given array `from right to left`, calls the provided `callback function`, and returns the results as a new array.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/mapRight/index.ts)

<br />

## Interface

```ts title="typescript"
function mapRight<T, U>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => U,
): U[];
```

<br />

## Usage

```ts title="typescript"
import { mapRight } from '@modern-kit/utils';

mapRight([1, 2, 3], (item, index) => item + index);
// [5, 3, 1]
```
