# union

A function that combines two arrays and returns a new array containing only unique values with duplicates removed.

By default, duplicate detection is performed only for primitive values.

If the second argument `iteratee` function is provided, duplicate detection is based on the iteratee return value for each element.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/union/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

### Default

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/union | 4,409,019.08 | 0.0002 | `fastest` |
| lodash/union | 3,714,184.11 | 0.0003 | `slowest` |

- **modern-kit/union**
  - `1.19x` faster than **lodash/union**

### with iteratee

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/union | 3,801,245.65 | 0.0003 | `fastest` |
| lodash/unionBy | 2,537,527.22 | 0.0004 | `slowest` |

- **modern-kit/union**
  - `1.50x` faster than **lodash/unionBy**

<br />

## Interface

```ts title="typescript"
function union<T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[]
): T[];

function union<T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[];
```

<br />

## Usage

### Default

```ts title="typescript"
import { union } from '@modern-kit/utils';

union([1, 2, 3, 4], [1, 2, 3, 5]); // [1, 2, 3, 4, 5]
```

<br />

### Iteratee

```ts title="typescript"
import { union } from '@modern-kit/utils';

const arr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const arr2 = [
  { id: 1, name: 'john' },
  { id: 3, name: 'gromit' },
];

union(arr1, arr2, (item) => item.id);
/*
  [
    { id: 1, name: 'john' },
    { id: 2, name: 'jane' },
    { id: 3, name: 'gromit' }
  ]
*/
```
