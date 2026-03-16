# xor

A function that computes the `symmetric difference (XOR)` between two arrays.

The result consists of elements that exist in only one of the two arrays. By default, comparison is performed for `primitive values`. If needed, the third argument `iteratee` function result can be used for comparison.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/xor/index.ts)

<br />

## Interface

```ts title="typescript"
// function overloading
function xor<T>(arr1: T[] | readonly T[], arr2: T[] | readonly T[]): T[];

function xor<T, U>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee: (item: T) => U
): T[];
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { xor } from '@modern-kit/utils';

xor([1, 2], [2, 3]); // [1, 3]
```

<br />

### `Iteratee` Usage

```ts title="typescript"
import { xor } from '@modern-kit/utils';

xor([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x) => x.id); // [{ id: 1 }, { id: 3 }]
```
