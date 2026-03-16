# isBoolean

A function that checks whether a given argument is a `boolean`, and if so, narrows the type of the argument to `boolean`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isBoolean/index.ts)

## Interface
```ts title="typescript"
const isBoolean: (arg: unknown) => arg is boolean
```

<br />

## Usage
```ts title="typescript"
import { isBoolean } from '@modern-kit/utils';

isBoolean(true); // true
isBoolean(false); // true

isBoolean(123); // false
isBoolean('123'); // false
isBoolean(() => {}); // false
isBoolean({}); // false
isBoolean([]); // false
```
