# countBy

A function that counts how many times each element appears in an array and returns the result as an object.

If an iteratee is provided, each element is passed to the iteratee and the count is based on the returned value.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/countBy/index.ts)

<br />

## Interface

```ts title="typescript"
// without iteratee
export function countBy<T extends readonly any[]>(
  arr: T
): Record<T[number], number>;

// with iteratee
export function countBy<T extends readonly any[], K extends PropertyKey>(
  arr: T,
  iteratee: (value: T[number]) => K
): Record<K, number>;
```

<br />

## Usage

```ts title="typescript"
import { countBy } from '@modern-kit/utils';

countBy([1, 2, 3, 2, 1]);
// { 1: 2, 2: 2, 3: 1 }

countBy([{ address: 'seoul' }, { address: 'incheon' }, { address: 'seoul' }], (value) => value.address);
// { seoul: 2, incheon: 1 }
```
