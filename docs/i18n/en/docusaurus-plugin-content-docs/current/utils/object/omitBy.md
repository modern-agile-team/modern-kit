# omitBy

Similar to the `omit` function, but returns a new object excluding properties from the given object that satisfy the `predicate` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/omitBy/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/omitBy | 9,108,836.71 | 0.0001 | `fastest` |
| lodash/omitBy | 1,876,976.55 | 0.0005 | `slowest` |

- **modern-kit/omitBy**
  - `4.85x` faster than lodash/omitBy

<br />

## Interface
```ts title="typescript"
function omitBy<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

<br />

## Usage
```ts title="typescript"
import { omitBy } from '@modern-kit/utils';

const obj = { a: 1, b: undefined, c: null, d: '', e: 'str' };
const result = omitBy(obj, (value) => !value);
// { a: 1, e: 'str' }
```
