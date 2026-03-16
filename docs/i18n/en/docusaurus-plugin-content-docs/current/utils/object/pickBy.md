# pickBy

Similar to the `pick` function, but returns a new object composed of properties from the given object that satisfy the `predicate` function.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/pickBy/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/pickBy | 7,602,665.15 | 0.0001 | `fastest` |
| lodash/pickBy | 1,768,814.92 | 0.0006 | `slowest` |

- **modern-kit/pickBy**
  - `4.30x` faster than lodash/pickBy

<br />

## Interface
```ts title="typescript"
function pickBy<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T>;
```

<br />

## Usage
```ts title="typescript"
import { pickBy } from '@modern-kit/utils';

const obj = { a: 1, b: undefined, c: null, d: '', e: 'str' };
const result = pickBy(obj, (value) => !value);
// { b: undefined, c: null, d: '' }
```
