# isNumeric

A function that checks whether a given string consists only of `digits (0-9)`.

The `sign` option allows including the `"-" sign` and `decimal point`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNumeric/index.ts)

## Interface
```ts title="typescript"
interface Options {
  sign?: boolean;
}

function isNumeric(value: string, options?: Options): boolean
```

<br />

## Usage
### Basic Usage

```ts title="typescript"
import { isNumeric } from '@modern-kit/utils';

isNumeric("123"); // true
isNumeric("0"); // true

isNumeric("-123"); // false
isNumeric("1a"); // false
isNumeric("1@"); // false
isNumeric("1[]"); // false
isNumeric("12.00"); // false
isNumeric(" "); // false
```

<br />

### Using the sign option

```ts title="typescript"
import { isNumeric } from '@modern-kit/utils';

isNumeric('123.45', { sign: true }); // true
isNumeric('-123.45', { sign: true }); // true

isNumeric('12.3a45', { sign: true }); // false
isNumeric('12-345', { sign: true }); // false, (the "-" sign can only be placed at the very beginning of the string)
isNumeric('123.', { sign: true }); // false, (no digits after the decimal point)
```
