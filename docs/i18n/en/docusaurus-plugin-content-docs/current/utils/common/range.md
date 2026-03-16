# range

Generates an array of numbers from a start value (start) to an end value (end) according to a given step interval.

- step must be an integer greater than or equal to 1.

The behavior is divided into the following 4 cases:

1. When only the end value (end) is provided, generates an array incrementing by 1 from 0 to end-1.

2. When both start and end are provided, generates an array incrementing by 1 from start to end.

3. When start, end, and step are all provided, generates an array from start to end with step as the interval.

4. When start is greater than end, generates a descending array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/range/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| ---- | ------------ | ------ | --------- |
| modern-kit/range | 4,628,798.60 | 0.0002 | `fastest` |
| lodash/range | 1,842,731.58 | 0.0003 | `slowest` |

- **modern-kit/range**
  - `2.51x` faster than lodash/range

<br />

## Interface
```ts title="typescript"
// Function overloads
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { range } from '@modern-kit/utils';

// Basic usage
const result1 = range(5); // [0, 1, 2, 3, 4]
const result2 = range(1, 6); // [1, 2, 3, 4, 5]
const result3 = range(1, 6, 2); // [1, 3, 5]
```

<br />

### Descending Array
```ts title="typescript"
import { range } from '@modern-kit/utils';

const result5 = range(10, 5); // [10, 9, 8, 7, 6]
const result6 = range(10, 0, 2); // [10, 8, 6, 4, 2]
```

<br />

### Negative Range
```ts title="typescript"
import { range } from '@modern-kit/utils';

const result7 = range(-5); // [0, -1, -2, -3, -4]
const result8 = range(-10, -5); // [-10, -9, -8, -7, -6]
const result9 = range(-10, 0, 2); // [-10, -8, -6, -4, -2]
```
