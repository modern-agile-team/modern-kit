# repeatCharacters

A function that repeats each character of a given string by the specified repeat count and returns a new string.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/repeatCharacters/index.ts)

<br />

## Interface
```ts title="typescript"
const repeatCharacters: (value: string, repeatCount: number) => string
```

<br />

## Usage
```ts title="typescript"
import { repeatCharacters } from '@modern-kit/utils';

const str1 = 'A!B@C';
const repeatedStr1 = repeatCharacters(str1, 2); // 'AA!!BB@@CC'

const str2 = 'Hello';
const repeatedStr2 = repeatCharacters(str2, 3); // 'HHHeeelllooo'
```
