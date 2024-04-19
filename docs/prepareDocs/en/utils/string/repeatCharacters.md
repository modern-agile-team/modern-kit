# repeatCharacters

A function that iterates over each character in a given string for a specified number of repetitions and returns a new string.

<br />

## Interface
```tsx
const repeatCharacters: (value: string, repeatCount: number) => string
```

## Usage
```ts
import { repeatCharacters } from '@devgrace/utils';

const str1 = 'A!B@C';
const repeatedStr1 = repeatCharacters(str1, 2); // 'AA!!BB@@CC'

const str2 = 'Hello';
const repeatedStr2 = repeatCharacters(str2, 3); // 'HHHeeelllooo'
```