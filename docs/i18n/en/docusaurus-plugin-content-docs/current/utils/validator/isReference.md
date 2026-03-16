# isReference

`Reference types` include objects, arrays, functions, and other `non-primitive types`. A function that checks whether a given argument is a `reference type`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isReference/index.ts)

## Interface
```ts title="typescript"
export type Reference =
  | object
  | any[]
  | Function
  | Set<any>
  | Map<any, any>
  | WeakMap<object, any>
  | WeakSet<object>
  | Date
  | RegExp
  | Error;

const isReference: (value: unknown) => value is Reference
```

<br />

## Usage
```ts title="typescript"
import { isReference } from '@modern-kit/utils';

isReference({}); // true
isReference([]); // true
isReference(new Set()); // true
isReference(new Map()); // true
isReference(new WeakSet()); // true
isReference(new WeakMap()); // true
isReference(new Date()); // true
isReference(new Error()); // true

isReference(null); // false
isReference(undefined); // false
isReference('string'); // false
isReference(1); // false
isReference(false); // false
isReference(Symbol()); // false
```
