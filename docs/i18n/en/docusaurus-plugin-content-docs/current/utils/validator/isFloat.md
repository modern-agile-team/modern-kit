# isFloat

A function that checks whether a given argument is a finite floating-point number.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isFloat/index.ts)

## Interface
```ts title="typescript"
const isFloat = (value: unknown) => value is number;
```

<br />

## Usage
```ts title="typescript"
import { isFloat } from '@modern-kit/utils';

isFloat(0.11886) // true
isFloat(175.5119687) // true
isFloat(-15.1175688775) // true

isFloat(100); // false
isFloat(''); // false
isFloat(null); // false
isFloat(NaN) // false
isFloat(Infinity) // false
isFloat(-Infinity) // false
isFloat([]) // false
isFloat({}) // false
```
