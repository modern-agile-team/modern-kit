# zip

Combines multiple arrays and returns an array of tuples.

If the input arrays have different lengths, the result array has the length of the longest input array.

`undefined` is used for missing elements.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/zip/index.ts)

<br />

## Interface

```ts title="typescript"
function zip<T extends (readonly unknown[])[]>(
  ...arrs: T
): Array<{
  [K in keyof T]: T[K] extends (infer U)[] ? U : never;
}>;
```

<br />

## Usage

```ts title="typescript"
import { zip } from '@modern-kit/utils';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const arr3 = [true, false, true];
const arr4 = [null, null];

zip(arr1);
// [[1], [2], [3]]
zip(arr1, arr2);
// [[1, 'a'], [2, 'b'], [3, 'c']]
zip(arr1, arr2, arr3);
// [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
zip(arr1, arr2, arr3, arr4);
// [[1, 'a', true, null], [2, 'b', false, null], [3, 'c', true, undefined]]
```
