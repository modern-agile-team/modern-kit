# isRegExp

A function that checks whether a given argument is a `RegExp`, and if so, narrows the type of the argument to `RegExp`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isRegExp/index.ts)

## Interface
```ts title="typescript"
function isRegExp(value: unknown): value is RegExp
```

<br />

## Usage
```ts title="typescript"
import { isRegExp } from '@modern-kit/utils';

isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true

isRegExp('abc'); // false
isRegExp(123); // false
isRegExp({}); // false
isRegExp([]); // false
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(() => {}); // false
isRegExp(Symbol('test')); // false
```
