# wrapInArray

A function that returns a wrapped array if the value is not already an array, and returns it unwrapped if it is already an array.

The returned array is a `new deeply copied array`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/common/wrapInArray/index.ts)

<br />

## Interface
```ts title="typescript"
const wrapInArray: <T>(value: T | T[]) => T[]
```

<br />

## Usage
```ts title="typescript"
import { wrapInArray } from '@modern-kit/utils';

const wrappedInArray1 = wrapInArray('ModernKit'); // ['ModernKit']
const wrappedInArray2 = wrapInArray([1, 2, 3]); // [1, 2, 3]
```
