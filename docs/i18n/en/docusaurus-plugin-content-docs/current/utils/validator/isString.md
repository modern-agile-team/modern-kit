# isString

A function that checks whether a given argument is a `string`, and if so, narrows the type of the argument to `string`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isString/index.ts)

## Interface
```ts title="typescript"
const isString: (arg: unknown) => arg is string
```

<br />

## Usage
```ts title="typescript"
import { isString } from '@modern-kit/utils';

isString('123'); // true

isString(123); // false
isString(() => {}); // false
isString(true); // false
isString({}); // false
isString([]); // false
```
