# random

Returns a `floating-point random number` within the specified range.

If a single argument is passed, it is treated as the maximum value, and the minimum value defaults to `0`.
If two arguments are passed, the first is used as the minimum and the second as the maximum.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/number/random/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/random | 17,637,495.39 | 0.0001 | `fastest` |
| lodash/random | 8,151,192.01 | 0.0001 | - |

- **modern-kit/random**
  - `2.16x` faster than lodash/random

<br />

## Interface
```ts title="typescript"
// Function overloading
function random(maximum: number): number;
function random(minimum: number, maximum: number): number;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { random } from '@modern-kit/utils';

const result = random(10); // Returns a floating-point random number from 0 (inclusive) to 10 (exclusive)
```

<br />

### With Range
```ts title="typescript"
import { random } from '@modern-kit/utils';

const result = random(5, 10); // Returns a floating-point random number from 5 (inclusive) to 10 (exclusive)
```
