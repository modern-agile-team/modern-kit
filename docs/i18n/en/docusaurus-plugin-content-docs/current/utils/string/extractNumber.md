# extractNumber

A function that `extracts only numbers` from a string.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractNumber/index.ts)

<br />

## Interface
```ts title="typescript"
function extractNumber(value: string): string
```

<br />

## Usage
```ts title="typescript"
import { extractNumber } from '@modern-kit/utils';

const str1 = extractNumber('abc123sd45'); // '12345'
const str2 = extractNumber('1 23 sd 4 5'); // '12345'
const str3 = extractNumber('🥲'); // ''
const str4 = extractNumber('   '); // ''
```
