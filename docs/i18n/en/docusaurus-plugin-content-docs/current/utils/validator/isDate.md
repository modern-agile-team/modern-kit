# isDate

A function that checks whether a given value is of type `Date`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isDate/index.ts)

## Interface
```ts title="typescript"
function isDate(value: unknown): value is Date
```

<br />

## Usage
```ts title="typescript"
import { isDate } from '@modern-kit/utils';

isDate(new Date()); // true
isDate(new Date('2024-12-31 12:00:00')); // true

isDate([]); // false
isDate(() => {}); // false
isDate('123'); // false
isDate(123); // false
isDate({}); // false
```
