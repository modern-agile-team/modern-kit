# isNumber

A function that checks whether a given argument is a `number`, and if so, narrows the type of the argument to `number`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNumber/index.ts)

## Interface
```ts title="typescript"
const isNumber: (arg: unknown) => arg is number
```

<br />

## Usage
```ts title="typescript"
import { isNumber } from '@modern-kit/utils';

isNumber(123); // true

isNumber(() => {}); // false
isNumber('123'); // false
isNumber(true); // false
isNumber({}); // false
isNumber([]); // false
```
