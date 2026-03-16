# shuffle

Randomly shuffles the order of elements in an array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/shuffle/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/shuffle | 2,874,351.45 | 0.0003 | `fastest` |
| lodash/shuffle | 1,895,677.79 | 0.0005 | `slowest` |

- **modern-kit/shuffle**
  - `1.52x` faster than lodash/shuffle

<br />

## Interface

```ts title="typescript"
function shuffle<T>(arr: T[] | readonly T[]): T[]
```

<br />

## Usage

```ts title="typescript"
import { shuffle } from '@modern-kit/utils';

shuffle([1, 2, 3, 4, 5]); // Returns a randomly shuffled array, e.g: [3, 5, 1, 3, 2]
```
