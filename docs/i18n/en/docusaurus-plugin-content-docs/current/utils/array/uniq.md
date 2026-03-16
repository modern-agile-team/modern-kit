# uniq

Returns a new array with duplicate elements removed, containing only unique elements.

By default, duplicate detection is performed only for primitive values. If the second argument `iteratee` function is provided, duplicate detection is based on the iteratee return value for each element.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/uniq/index.ts)

<br />

## Benchmark

- `hz`: Operations per second
- `mean`: Average response time (ms)

### Default

| Name            | hz           | mean   | Performance |
| --------------- | ------------ | ------ | ----------- |
| modern-kit/uniq | 9,049,882.24 | 0.0001 | `fastest`   |
| lodash/uniq     | 6,259,278.14 | 0.0002 | `slowest`   |

- **modern-kit/uniq**
  - `1.45x` faster than **lodash/uniq**

### with iteratee

| Name            | hz            | mean   | Performance |
| --------------- | ------------- | ------ | ----------- |
| modern-kit/uniq | 10,429,151.37 | 0.0001 | `fastest`   |
| lodash/uniqBy   | 4,837,704.04  | 0.0002 | `slowest`   |

- **modern-kit/uniq**
  - `2.16x` faster than **lodash/uniqBy**

<br />

## Interface

```ts title="typescript"
function uniq<T>(arr: T[] | readonly T[]): T[];

function uniq<T, U = T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[];
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { uniq } from '@modern-kit/utils';

uniq([1, 2, 3]); // [1, 2, 3]
uniq([1, 2, 2, 2, 3]); // [1, 2, 3]
```

<br />

### `Iteratee` Usage

```ts title="typescript"
import { uniq } from '@modern-kit/utils';

const testArr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' },
  { id: 3, name: 'gromit' },
  { id: 3, name: 'gromit' },
];

uniq(testArr, (item) => item.id);
/*
  [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'gromit' }
  ];
*/

uniq([1, 2, 2.1, 2.2, 2.3, 3], (item) => Math.floor(item)); // [1, 2, 3]
```
