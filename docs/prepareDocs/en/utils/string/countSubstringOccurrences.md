# countSubstringOccurrences

a function that returns a count of how many times a particular substring has occurred in a string.

<br />

## Interface
```tsx
const countSubstringOccurrences: (source: string, target: string) => number
```

## Usage
```ts
import { countSubstringOccurrences } from '@devgrace/utils';

const str = 'apple banana apple grapes apple';
const count1 = countSubstringOccurrences(str, 'apple'); // 3
const count2 = countSubstringOccurrences(str, 'apple banana'); // 1
```