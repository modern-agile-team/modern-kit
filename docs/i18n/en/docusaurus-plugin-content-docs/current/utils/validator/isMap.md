# isMap

A function that checks whether a given argument is a `Map` object.

Useful for type checking and narrowing the type of the argument to `Map`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isMap/index.ts)

## Interface
```ts title="typescript"
function isMap(value: unknown): value is Map<any, any>
```

<br />

## Usage
```ts title="typescript"
import { isMap } from '@modern-kit/utils';

isMap(new Map()) // true
isMap(new Map([['hello', 5],['world', 5]])) // true

isMap([]) // false
isMap({}) // false
isMap(new Set()) // false
isMap(new WeakMap()) // false
isMap(new Date()) // false
isMap(null) // false
isMap(undefined) // false
```
