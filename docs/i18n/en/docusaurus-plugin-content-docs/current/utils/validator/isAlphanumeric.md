# isAlphanumeric

A function that checks whether a given string consists only of `alphabetic characters and digits`.

It uses a regular expression to verify that the string is composed only of alphabetic characters (a-z, A-Z) and digits (0-9).

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isAlphanumeric/index.ts)

## Interface
```ts title="typescript"
const isAlphanumeric: (value: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isAlphanumeric } from '@modern-kit/utils';

isAlphanumeric('abc'); // true
isAlphanumeric('123'); // true
isAlphanumeric('abc123'); // true

isAlphanumeric('abc123!'); // false
isAlphanumeric('abc 123'); // false
isAlphanumeric(''); // false
isAlphanumeric('😂'); // false
isAlphanumeric('한글'); // false
```
