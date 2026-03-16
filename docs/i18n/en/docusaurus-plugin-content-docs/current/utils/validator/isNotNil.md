# isNotNil

A function that checks whether a given argument is neither `null` nor `undefined`, and if so, narrows the type to the original argument type.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNotNil/index.ts)

## Interface
```ts title="typescript"
const isNotNil: <T>(val: T | null | undefined) => val is T
```

<br />

## Usage
```ts title="typescript"
import { isNotNil } from '@modern-kit/utils';

isNotNil(1); // true
isNotNil(false); // true
isNotNil("str"); // true
isNotNil({}); // true

isNotNil(undefined); // false
isNotNil(null); // false
```
