# excludeChars

A function that excludes characters from a given string according to the specified options.

It is the exact opposite of `extractChars`, which keeps the specified types: it strips out the specified types instead.

By default, it `excludes letters only`. The following options can be configured:
- `letters`: Specifies whether to exclude letters from the string. Combining marks (accents, etc.) are excluded together.
- `numbers`: Specifies whether to exclude numbers from the string.
- `specialCharacters`: Specifies whether to exclude special characters from the string.
- `whiteSpace`: Specifies whether to exclude whitespace from the string.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/excludeChars/index.ts)

<br />

## Interface
```ts title="typescript"
interface ExcludeCharsOptions {
  letters?: boolean; // default: true
  numbers?: boolean; // default: false
  specialCharacters?: boolean; // default: false
  whiteSpace?: boolean; // default: false
}

function excludeChars(value: string, options?: ExcludeCharsOptions): string
```

<br />

## Usage
```ts title="typescript"
import { excludeChars } from '@modern-kit/utils';

const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

const withoutLetters = excludeChars(input); // ', !  123  $100 + 200 = 300! 😄'

const withoutLettersAndWhiteSpace = excludeChars(input, {
  letters: true,
  whiteSpace: true,
}); // ',!123$100+200=300!😄'

const withoutNumbersAndSpecialCharacters = excludeChars(input, {
  numbers: true,
  specialCharacters: true,
}); // 'Hello 世界 안녕하세요  こんにちは      '

// Combining marks are not broken apart
excludeChars('José'.normalize('NFD'), { numbers: true }); // 'José'
```
