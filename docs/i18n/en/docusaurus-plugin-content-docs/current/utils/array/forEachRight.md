# forEachRight

Iterates over each element of the given array `from right to left` and calls the provided `callback function`.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/forEachRight/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/forEachRight | 10,607,063.51 | 0.3479 | `fastest` |
| lodash/forEachRight | 5,715,281.60 | 3.4568 | `slowest` |

- **modern-kit/forEachRight**
  - `1.86x` faster than lodash/forEachRight

<br />

## Interface

```ts title="typescript"
function forEachRight<T>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => void
): void;
```

<br />

## Usage

```ts title="typescript"
import { forEachRight } from '@modern-kit/utils';

const items = ['apple', 'banana', 'cherry'];

forEachRight(items, (item, index, arr) => {
  console.log(`Index ${index}: ${item}`);
});
/*
  Index 2: cherry
  Index 1: banana
  Index 0: apple
*/
```
