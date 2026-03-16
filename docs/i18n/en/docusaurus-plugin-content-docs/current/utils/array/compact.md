# compact

A function that removes `false`, `0`, `''`, `null`, and `undefined` values from an array and returns a new array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/compact/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/compact | 7,306,246.60 | 0.0004 | `fastest` |
| lodash/compact | 5,472,880.46 | 0.0006 | `slowest` |

- **modern-kit/compact**
  - `1.33x` faster than lodash/compact

<br />

## Interface

```ts title="typescript"
type Removable = false | 0 | '' | null | undefined;
type Retained<T> = Exclude<T, Removable>;

const compact: <T>(arr: T[] | readonly T[]) => Retained<T>[];
```

<br />

## Usage

```ts title="typescript"
import { compact } from '@modern-kit/utils';

compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// [1, 2, 3, 4, 5]
```
