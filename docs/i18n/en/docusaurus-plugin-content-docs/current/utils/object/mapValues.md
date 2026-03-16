# mapValues

Returns a new object by transforming each value of the given object according to the result of the provided `iteratee` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/mapValues/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/mapValues | 6,203,964.88 | 0.0003 | `fastest` |
| lodash/mapValues | 4,557,524.77 | 0.0004 | `slowest` |

- **modern-kit/mapValues**
  - `1.36x` faster than lodash/mapValues

<br />

## Interface
```ts title="typescript"
function mapValues<T extends Record<PropertyKey, any>, V>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => V
): Record<keyof T, V>;
```

<br />

## Usage
```ts title="typescript"
import { mapValues } from '@modern-kit/utils';

const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};

const newUsers = mapValues(users, ({ value }) => value.age);
// { fred: 40, pebbles: 1 }
```
