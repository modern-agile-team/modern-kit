# isOdd

A function that checks whether a given number is `odd`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/isOdd/index.ts)

<br />

## Interface
```ts title="typescript"
function isOdd(value: number): boolean;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { isOdd } from '@modern-kit/utils';

// Odd number check
isOdd(3); // true
isOdd(1); // true
isOdd(-1); // true
isOdd(-33); // true

// Even number check
isOdd(2); // false
isOdd(0); // false
isOdd(100); // false
isOdd(-2); // false
```
