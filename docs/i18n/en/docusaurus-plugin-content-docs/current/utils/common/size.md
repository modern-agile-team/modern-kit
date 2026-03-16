# size

Returns the size of the given value. The size is determined by the type of the value:
  - For `strings`, returns the number of characters.
  - For `arrays`, `NodeList`, and `HTMLCollection`, returns the number of elements.
  - For `Set` and `Map`, returns the number of items.
  - For plain objects, returns the `number of own enumerable properties`.
  - Other types such as numbers, WeakMap, WeakSet are not allowed.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/size/index.ts)

<br />

## Benchmark
- `hz`: operations per second
- `mean`: average response time (ms)

| Name | hz | mean | Performance |
| ---- | ------------ | ------ | --------- |
| modern-kit/size | 868,075.34 | 0.0012 | `fastest` |
| lodash/size | 232,384.63 | 0.0043 | `slowest` |

- **modern-kit/size**
  - `3.74x` faster than lodash/size

<br />

## Interface
```ts title="typescript"
function size(value: string | Record<PropertyKey, any>): number
```

<br />

## Usage
```ts title="typescript"
import { size } from '@modern-kit/utils';

size('12345'); // 5

size([1, 2, 3, 4, 5]); // 5

size(new Set([1, 2, 3, 4, 5])); // 5

size({ a: 1, b: 2, c: 3, d: 4, e: 5 }); // 5
```
