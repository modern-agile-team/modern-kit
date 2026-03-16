# isHangulAlphanumeric

A function that checks whether a given string consists only of `Korean (Hangul) characters, alphabetic characters, or digits`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isHangulAlphanumeric/index.ts)

## Interface
```ts title="typescript"
const isHangulAlphanumeric: (value: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isHangulAlphanumeric } from '@modern-kit/utils';

isHangulAlphanumeric('안녕하세요'); // true
isHangulAlphanumeric('Hello123'); // true
isHangulAlphanumeric('123'); // true

isHangulAlphanumeric('!@#'); // false
isHangulAlphanumeric(''); // false
```
