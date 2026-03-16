# difference

A function that returns a new array containing only the unique values from the first array that are not present in the second array.

By default, comparison is performed only for primitive values. An `iteratee` function can be provided to transform each element before comparison.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/difference/index.ts)

<br />

## Benchmark

- `hz`: Operations per second
- `mean`: Average response time (ms)

### Default

| Name                  | hz           | mean   | Performance |
| --------------------- | ------------ | ------ | ----------- |
| modern-kit/difference | 9,251,611.33 | 0.0001 | `fastest`   |
| lodash/difference     | 4,113,377.61 | 0.0002 | `slowest`   |

- **modern-kit/difference**
  - `2.25x` faster than **lodash/difference**

### with iteratee

| Name                  | hz            | mean   | Performance |
| --------------------- | ------------- | ------ | ----------- |
| modern-kit/difference | 11,133,900.99 | 0.0001 | `fastest`   |
| lodash/differenceBy   | 3,211,808.45  | 0.0002 | `slowest`   |

- **modern-kit/difference**
  - `3.47x` faster than **lodash/differenceBy**

<br />

## Interface

```ts title="typescript"
const difference: <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { difference } from '@modern-kit/utils';

const arr1 = [1, 2, 3, 4];
const arr2 = [2, 4];

difference(arr1, arr2); // [1, 3]
```

<br />

### `Iteratee` Usage

```ts title="typescript"
import { difference } from '@modern-kit/utils';

const arr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'dylan' },
  { id: 3, name: 'modern' },
  { id: 4, name: 'gromit' },
];
const arr2 = [
  { id: 2, name: 'john' },
  { id: 4, name: 'gromit' },
];

difference(arr1, arr2, (item) => item.id);
/*
  [
    { id: 1, name: 'john' },
    { id: 3, name: 'modern' },
  ]
*/
```
