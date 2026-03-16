# isArray

A function that checks whether a given argument is an `array`, and if so, narrows the type of the argument to `Array`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isArray/index.ts)

## Interface
```ts title="typescript"
const isArray: <T>(value: unknown) => value is T[] | readonly T[]
```

<br />

## Usage
```ts title="typescript"
import { isArray } from '@modern-kit/utils';

isArray([]); // true
isArray(() => {}); // false
isArray('123'); // false
isArray(123); // false
isArray({}); // false
```
