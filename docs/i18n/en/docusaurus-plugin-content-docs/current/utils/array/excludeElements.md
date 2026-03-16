# excludeElements

A utility function that excludes elements of the second array from the array passed as the first parameter.

For primitive values, using `as const` is recommended for accurate type checking.
By default, comparison is performed for primitive values. For reference types, the third `iteratee` function result can be used to determine which elements to exclude.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/excludeElements/index.ts)

<br />

## Interface

```ts title="typescript"
const excludeElements: <T, U>(
  arr: T[] | readonly T[],
  target: T[] | readonly T[],
  iteratee?: ((item: T) => U) | undefined
) => T[];
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [1, 2, 3, 4];
const excluded = [3, 4];

excludeElements(array, excluded); // [1, 2]
```

<br />

### String array

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = ['a', 'b', 'c', 'd'];
const excluded = ['a'];

excludeElements(array, excluded); // ['b', 'c', 'd']
```

<br />

### Reference type comparison with iteratee

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [[3, 'a'], [4, 'b']];
const excluded = [[3, 'a']];

excludeElements(array, excluded, (item) => JSON.stringify(item)); // [[4, 'b']]
```

```ts title="typescript"
import { excludeElements } from '@modern-kit/utils';

const array = [
  { name: 'kim', address: { city: 'Seoul' } },
  { name: 'lee', address: { city: 'NewYork' } },
];
const excluded = [{ name: 'kim', address: { city: 'Seoul' } }];

excludeElements(array, excluded, (item) => item.name);
// [{ name: 'lee', address: { city: 'NewYork' } }]
```
