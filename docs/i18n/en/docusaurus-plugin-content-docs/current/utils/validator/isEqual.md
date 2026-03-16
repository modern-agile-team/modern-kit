# isEqual

A function that performs a `deep comparison` of two given values and returns whether they are equal.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isEqual/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

|Name|hz|mean|Performance|
|------|---|---|---|
|modern-kit/isEqual|9,128,265.02|0.0001|`fastest`|
|lodash/isEqual|6,979,847.18|0.0001|`slowest`|

- **modern-kit/isEqual**
  - `1.31x` faster than lodash/isEqual

<br />

## Interface
```ts title="typescript"
const isEqual: (source: any, target: any) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isEqual } from '@modern-kit/utils';

const isEqual1 = isEqual(1, 1); // true
const isEqual2 = isEqual({ a: 1}, { a: 1}); // true
const isEqual3 = isEqual([1, 2, 3], [1, 2, 3]); // true

const isEqual4 = isEqual("1", "2"); // false
const isEqual5 = isEqual({ a: 1}, { a: 2}); // false
const isEqual6 = isEqual([1, 2, 3], [1, "2", 3]); // false
```
