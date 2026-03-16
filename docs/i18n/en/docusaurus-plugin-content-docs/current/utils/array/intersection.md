# intersection

A function that returns a new array containing the values that exist in both arrays (the intersection).

By default, comparison is performed only for primitive values. If needed, the third argument `iteratee` function result can be used to determine intersecting elements.

This function removes duplicate values based on the first array.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/intersection/index.ts)

<br />

## Benchmark
- `hz`: Operations per second
- `mean`: Average response time (ms)

### Default

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/intersection | 8,649,185.29 | 0.0001 | `fastest` |
| lodash/intersection | 3,722,050.21 | 0.0003 | `slowest` |

- **modern-kit/intersection**
  - `2.32x` faster than **lodash/intersection**

### with iteratee

| Name | hz | mean | Performance |
| --- | --- | --- | --- |
| modern-kit/intersection | 10,210,296.98 | 0.0001 | `fastest` |
| lodash/intersectionBy | 1,278,057.73 | 0.0002 | `slowest` |

- **modern-kit/intersection**
  - `7.99x` faster than **lodash/intersectionBy**

<br />

## Interface

```ts title="typescript"
function intersection<T, U>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
): T[];
```

<br />

## Usage

### Default

```ts title="typescript"
import { intersection } from '@modern-kit/utils';

intersection([1, 2, 3, 5, 7], [1, 2, 4, 5, 8]); // [1, 2, 5]
```

<br />

### Iteratee

```ts title="typescript"
import { intersection } from '@modern-kit/utils';

const testArr1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'gromit' },
];

const testArr2 = [
  { id: 1, name: 'john' },
  { id: 3, name: 'dylan' },
];

intersection(testArr1, testArr2, (item) => item.id);
/*
  [{ id: 1, name: 'John' }];
*/
```
