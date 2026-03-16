# isPlainObject

A function that checks whether a given argument is a `Plain Object`.

A Plain Object refers to an object created via an `object literal ({})` or `new Object()`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPlainObject/index.ts)

## Interface
```ts title="typescript"
const isPlainObject: (value: unknown) => value is Record<PropertyKey, any>
```

<br />

## Usage
```ts title="typescript"
import { isPlainObject } from '@modern-kit/utils';

isPlainObject({}) // true
isPlainObject(new Object()) // true

isPlainObject(function() {}) // false
isPlainObject(() => {}) // false
isPlainObject([]) // false
isPlainObject(new Set()) // false
isPlainObject(new Map()) // false
isPlainObject(null) // false
isPlainObject(undefined) // false
```
