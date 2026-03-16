# isEven

A function that checks whether a given number is `even`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/isEven/index.ts)

<br />

## Interface
```ts title="typescript"
function isEven(value: number): boolean;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { isEven } from '@modern-kit/utils';

// Even number check
isEven(2); // true
isEven(0); // true
isEven(100); // true
isEven(-2); // true

// Odd number check
isEven(3); // false
isEven(1); // false
isEven(-1); // false
isEven(-33); // false
```
