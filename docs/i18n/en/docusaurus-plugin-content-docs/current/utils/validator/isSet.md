# isSet

A function that checks whether a given argument is a `Set` object.

Useful for type checking and narrowing the type of the argument to `Set`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isSet/index.ts)

## Interface
```ts title="typescript"
function isSet(value: unknown): value is Set<any>
```

<br />

## Usage
```ts title="typescript"
import { isSet } from '@modern-kit/utils';

isSet(new Set()) // true
isSet(new Set([1, 2, 3])) // true

isSet([]) // false
isSet({}) // false
isSet(new Map()) // false
isSet(new WeakSet()) // false
isSet(new Date()) // false
isSet(null) // false
isSet(undefined) // false
```
