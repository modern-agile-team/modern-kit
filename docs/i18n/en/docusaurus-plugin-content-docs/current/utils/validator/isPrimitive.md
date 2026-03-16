# isPrimitive

A function that checks whether a given argument is a `primitive value`, and if so, narrows the type of the argument to `Primitive`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isPrimitive/index.ts)

## Interface
```ts title="typescript"
type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;

const isPrimitive: (value: unknown) => value is Primitive
```

<br />

## Usage
```ts title="typescript"
import { isPrimitive } from '@modern-kit/utils';

isPrimitive(123); // true
isPrimitive('123'); // true
isPrimitive(true); // true
isPrimitive(Symbol()); // true
isPrimitive(null); // true
isPrimitive(undefined); // true

isPrimitive({}); // false
isPrimitive([]); // false
isPrimitive(new Set()); // false
isPrimitive(new Map()); // false
```
