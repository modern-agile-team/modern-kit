# randomInt

Returns an `integer random number` within the specified range.

If a single argument is passed, it is treated as the maximum value, and the minimum value defaults to `0`.
If two arguments are passed, the first is used as the minimum and the second as the maximum.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/number/randomInt/index.ts)

<br />

## Interface
```ts title="typescript"
// Function overloading
function randomInt(maximum: number): number;
function randomInt(minimum: number, maximum: number): number;
```

<br />

## Usage
### Basic Usage
```ts title="typescript"
import { randomInt } from '@modern-kit/utils';

const result = randomInt(10); // Returns an integer random number from 0 (inclusive) to 10 (exclusive)
```

<br />

### With Range
```ts title="typescript"
import { randomInt } from '@modern-kit/utils';

const result = randomInt(5, 10); // Returns an integer random number from 5 (inclusive) to 10 (exclusive)
```
