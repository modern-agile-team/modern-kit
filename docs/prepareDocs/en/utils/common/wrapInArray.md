# wrapInArray

A function that returns a wrapped array if it's not an array, or an unwrapped array if it is.

The returned array is `a new deeply copied array`.

<br />

## Interface
```tsx
const wrapInArray: <T>(value: T | T[]) => T[]
```

## Usage
```ts
import { wrapInArray } from '@devgrace/utils';

const wrappedInArray1 = wrapInArray('DevGrace'); // ['DevGrace']
const wrappedInArray2 = wrapInArray([1, 2, 3]); // [1, 2, 3]
```