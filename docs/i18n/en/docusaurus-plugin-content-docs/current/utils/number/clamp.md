# clamp

`Constrains a given value` between a `minimum and maximum value`.

If the input value is less than the minimum, the minimum is returned; if greater than the maximum, the maximum is returned. If the value is within range, it is returned as is.

If the maximum value is not provided, the second argument is treated as the maximum, and the smaller of the input value and the maximum is returned.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/number/clamp/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/clamp | 18,471,965.06 | 0.0001 | `fastest` |
| lodash/clamp | 10,097,932.96 | 0.0001 | - |

- **modern-kit/clamp**
  - `1.83x` faster than lodash/clamp

<br />

## Interface
```ts title="typescript"
function clamp(value: number, max: number): number;
function clamp(value: number, min: number, max: number): number;
```

<br />

## Usage
```ts title="typescript"
import { clamp } from '@modern-kit/utils';

clamp(3, 5); // 3
clamp(10, 6); // 6
clamp(7, 0, 10); // 7
clamp(10, 0, 5); // 5
clamp(-5, 0, 10); // 0
```
