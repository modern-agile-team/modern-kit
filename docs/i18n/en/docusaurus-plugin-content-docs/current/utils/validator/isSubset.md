# isSubset

Returns a `boolean` indicating whether the first array argument completely contains (is a superset of) all elements in the second array argument.

When array elements are of a reference type, you can define an iteratee function argument to specify the comparison criterion.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isSubset/index.ts)

## Interface
```ts title="typescript"
const isSubset = <T, U>(
  superset: T[] | readonly T[],
  subset: T[] | readonly T[],
  iteratee?: (item: T) => U
) => boolean;
```

<br />

## Usage
### Basic Usage

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = [1, 2, 3, 4];
const subset1 = [1, 3];
const subset2 = [1, 5];

isSubset(superset, subset1); // true
isSubset(superset, subset2); // false
```

<br />

### Mixed Type Array

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = ['1', 2, 3, 4];
const subset1 = ['1', 2, 3];
const subset2 = [1, '2', 3];

isSubset(superset, subset1); // true
isSubset(superset, subset2); // false
```

<br />

### Array Elements (using iteratee)

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9]];
const subset1 = [[0, 1, 2, 3, 4]];
const subset2 = [[0, 1, 7, 4, 9]];

isSubset(superset, subset1); // false, elements are reference types (arrays), so false is returned because memory addresses differ
isSubset(superset, subset2, (arr) => arr[2]); // true  ([2,7], [7])
isSubset(superset, subset2, (arr) => arr[3]); // false ([3,8], [4])
```

<br />

### Object Elements (using iteratee)

```ts title="typescript"
import { isSubset } from '@modern-kit/utils';

const superset = [
  {
    name: 'Peter',
    age: 13,
  },
  {
    name: 'Aimee',
    age: 25,
  },
];

const subset1 = [
  {
    name: 'Aimee',
    age: 25,
  },
];

const subset2 = [
  {
    name: 'Peter',
    age: 15,
  },
];

isSubset(superset, subset1); // false, elements are reference types (objects), so false is returned because memory addresses differ
isSubset(superset, subset1, (obj) => JSON.stringify(obj)); // true
isSubset(superset, subset2, (obj) => JSON.stringify(obj)); // false
isSubset(superset, subset2, (obj) => obj.name); // true, compared by name
```
