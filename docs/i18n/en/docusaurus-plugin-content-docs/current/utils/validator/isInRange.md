# isInRange

Determines whether a given value falls within the range specified by `min` and `max`.

You can configure whether to include boundary values via `inclusiveMin`/`inclusiveMax`. By default, the minimum value is inclusive and the maximum value is exclusive.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isInRange/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

|Name|hz|mean|Performance|
|------|---|---|---|
|modern-kit/isInRange|24,435,490.55|0.0000|`fastest`|
|lodash/inRange|9,373,021.30|0.0001|`slowest`|

- **modern-kit/isInRange**
  - `2.61x` faster than lodash/inRange

<br />

## Interface
```ts title="typescript"
interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  inclusiveMin?: boolean;
  inclusiveMax?: boolean;
}

function isInRange({
  value,
  min,
  max,
  inclusiveMin,
  inclusiveMax,
}: IsInRangeProps): boolean;
```

<br />

## Usage
```ts title="typescript"
import { isInRange } from '@modern-kit/utils';

isInRange({ value: 5, min: 0, max: 10 }) // true
isInRange({ value: 0, min: 0, max: 10 }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: true }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: false, inclusiveMax: true }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: true, inclusiveMax: true }) // true

// Error
isInRange({ value: 5, min: 10, max: 0 }) // Error('min must be less than max.')
```
