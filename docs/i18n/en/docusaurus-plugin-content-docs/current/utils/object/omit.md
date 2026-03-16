# omit

Returns a new object based on the first argument `object`, omitting the properties corresponding to the elements of the `keys` array passed as the second argument.

The returned object is a `deep-copied new object`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/omit/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/omit | 1,505,400.16 | 0.0003 | `fastest` |
| lodash/omit | 901,269.43 | 0.0011 | `slowest` |

- **modern-kit/omit**
  - `1.67x` faster than lodash/omit

<br />

## Interface
```ts title="typescript"
function omit<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[] | readonly K[]
): Omit<T, K>;
```

<br />

## Usage
```ts title="typescript"
import { omit } from '@modern-kit/utils';

omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']); // { b: 2, c: 3 }
```
