# mapKeys

Returns a new object by transforming each key of the given object according to the result of the provided `iteratee` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapKeys/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/mapKeys | 3,983,407.38 | 0.0003 | `fastest` |
| lodash/mapKeys | 3,060,203.94 | 0.0003 | `slowest` |

- **modern-kit/mapKeys**
  - `1.30x` faster than lodash/mapKeys

<br />

## Interface
```ts title="typescript"
function mapKeys<T extends Record<PropertyKey, any>, K extends PropertyKey>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => K
): Record<K, T[keyof T]>;
```

<br />

## Usage
```ts title="typescript"
import { mapKeys } from '@modern-kit/utils';

const obj = { a: 1, b: 2 };

const newObj = mapKeys(obj, ({ key, value }) => key + value);
// { a1: 1, b2: 2 }
```
