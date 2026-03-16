# pick

Returns an object composed of the given `keys`. The returned object is a `deep-copied new object`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/object/pick/index.ts)

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/pick | 1,693,028.73 | 0.0002 | `fastest` |
| lodash/pick | 1,022,887.39 | 0.0010 | `slowest` |

- **modern-kit/pick**
  - `1.60x` faster than lodash/pick

<br />

## Interface
```ts title="typescript"
function pick<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[] | readonly K[]
): Pick<T, K>;
```

<br />

## Usage
```ts title="typescript"
import { pick } from '@modern-kit/utils';

const pickedObj1 = pick({ a: 1, b: 2, c: 3 }, 'b'); // { b: 2 }
const pickedObj2 = pick({ a: 1, b: 2, c: 3 }, ['a', 'c']); // { a: 1, c: 3 }
```
