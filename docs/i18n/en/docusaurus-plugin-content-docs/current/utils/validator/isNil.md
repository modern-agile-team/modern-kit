# isNil

A function that checks whether a given argument is `null` or `undefined`, and if so, narrows the type of the argument to `undefined | null`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNil/index.ts)

## Interface
```ts title="typescript"
const isNil: <T>(val: T | null | undefined) => val is null | undefined
```

<br />

## Usage
```ts title="typescript"
import { isNil } from '@modern-kit/utils';

isNil(undefined); // true
isNil(null); // true

isNil(1); // false
isNil(false); // false
isNil("str"); // false
isNil({}); // false
```
