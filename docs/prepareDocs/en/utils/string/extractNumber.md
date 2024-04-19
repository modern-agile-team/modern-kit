# extractNumber

A function that returns a string stripped of all characters except numbers when `string` is entered.

<br />

## Interface
```tsx
const extractNumber: (value: string) => string
```

## Usage
```ts
import { extractNumber } from '@modern-kit/utils';

const str1 = extractNumber('abc123sd45'); // '12345'
const str2 = extractNumber('1 23 sd 4 5'); // '12345'
const str3 = extractNumber('🥲'); // ''
const str4 = extractNumber('   '); // ''
```