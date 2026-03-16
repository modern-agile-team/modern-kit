# partition

A function that divides the `array` (first argument) into two groups based on the `predicate` function (second argument): elements for which the predicate returns `true` and elements for which it returns `false`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/partition/index.ts)

<br />

## Interface

```ts title="typescript"
const partition: <T>(
  arr: T[] | readonly T[],
  predicate: (item: T) => boolean
) => [truthyArray: T[], falsyArray: T[]];
```

<br />

## Usage

### Basic Usage

```ts title="typescript"
import { partition } from '@modern-kit/utils';

const numberList = [1, 2, 3, 4, 5];
const [evens, odds] = partition(numberList, (num) => num % 2 === 0);

/*
  evens: [2, 4]
  odds: [1, 3, 5]
*/
```

<br />

### Filtering object arrays

```ts title="typescript"
import { partition } from '@modern-kit/utils';

const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
  { user: 'pebbles', age: 1,  active: false }
];

const [activeUsers, inActiveUsers] = partition(
  users,
  (item) => item.active
);

/*
  activeUsers: [{ user: 'fred', age: 40, active: true }]
  inActiveUsers: [
    { user: 'barney', age: 36, active: false },
    { user: 'pebbles', age: 1, active: false },
  ]
*/
```
