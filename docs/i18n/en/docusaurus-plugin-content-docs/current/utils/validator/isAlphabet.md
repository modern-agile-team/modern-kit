# isAlphabet

A function that checks whether a given string consists only of `alphabetic` characters.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isAlphabet/index.ts)

## Interface
```ts title="typescript"
const isAlphabet: (value: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isAlphabet } from '@modern-kit/utils';

isAlphabet('abc'); // true

isAlphabet('안녕하세요'); // false
isAlphabet('123'); // false
isAlphabet('!@#'); // false
isAlphabet(''); // false
```
