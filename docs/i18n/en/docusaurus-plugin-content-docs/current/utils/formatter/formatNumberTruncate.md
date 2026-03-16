# formatNumberTruncate

A function that truncates a given `number` by the given `truncation unit (powers of 10 including 1: 10/100/1000/...)` and returns the result.

If the number has a decimal point, the decimal digits are automatically truncated.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/formatter/formatNumberTruncate/index.ts)

<br />

## Interface
```ts title="typescript"
type TruncationUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

function formatNumberTruncate(value: number, truncationUnit: TruncationUnit): number
```

<br />

## Usage
```ts title="typescript"
import { formatNumberTruncate } from '@modern-kit/utils';

formatNumberTruncate(1234567, 1000) // 1234000

formatNumberTruncate(-1234567, 1000) // -1234000

formatNumberTruncate(-1234567.1234, 1000) // -1234000
```
