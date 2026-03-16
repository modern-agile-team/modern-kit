# isHangul

A function that checks whether a given string consists only of `Korean (Hangul)` characters.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isHangul/index.ts)

## Interface
```ts title="typescript"
const isHangul: (value: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isHangul } from '@modern-kit/utils';

isHangul('안녕하세요'); // true

isHangul('Hello'); // false
isHangul('123'); // false
isHangul('!@#'); // false
isHangul(''); // false
```
