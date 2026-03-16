# reverseString

A function that reverses and returns a given string.

Uses the `spread` operator to support `unicode strings`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/reverseString/index.ts)

<br />

## Interface
```ts title="typescript"
function reverseString(value: string): string
```

<br />

## References

- [modern-kit/issues/272](https://github.com/modern-agile-team/modern-kit/issues/272)
<br />

## Usage
```ts title="typescript"
import { reverseString } from '@modern-kit/utils';

const reversedInvalidValue = reverseString(undefined) // ''

const normalString = 'ABC가나다';
const reversedNormalString = reverseString(normalString); // '다나가CBA'

const stringWithSpecialCharacter = 'A!B@C';
const reversedStringWithSpecialCharacter = reverseString(stringWithSpecialCharacter); // 'C@B!A'

const stringWithUnicodeCharacter = 'foo 𝌆 bar';
const reversedStringWithUnicodeCharacter = reverseString(stringWithUnicodeCharacter) // 'rab 𝌆 oof'
```
