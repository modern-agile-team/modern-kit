# at

Returns an element at a specific index from the given array.

[Array.prototype.at()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at) is a modern spec function, so this utility can be used when browser compatibility issues arise.

- Reference: [Browser compatibility](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at#browser_compatibility)

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/at/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/at | 5,830,795.68 | 0.0003 | `fastest` |
| lodash/nth | 1,801,680.74 | 0.0005 | `slowest` |

- **modern-kit/at**
  - `3.24x` faster than lodash/nth

<br />

## Interface

```ts title="typescript"
function at<T>(arr: T[] | readonly T[], index: number = 0): T | undefined
```

<br />

## Usage

### Positive index

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5]); // 1
at([1, 2, 3, 4, 5], 0); // 1
at([1, 2, 3, 4, 5], 1); // 2
at([1, 2, 3, 4, 5], 2); // 3
```

<br />

### Negative index

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5], -1); // 5
at([1, 2, 3, 4, 5], -2); // 4
at([1, 2, 3, 4, 5], -3); // 3
```

<br />

### Out-of-range index

```ts title="typescript"
import { at } from '@modern-kit/utils';

at([1, 2, 3, 4, 5], 3); // undefined
at([1, 2, 3, 4, 5], -4); // undefined
```
