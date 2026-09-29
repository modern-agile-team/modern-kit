# extractChars

A function that extracts characters from a given string according to the specified options.

By default, it `extracts letters only` (`{ letters: true }`). When `options` is passed, any option left out is treated as `false`, so set `letters: true` explicitly if you also want to extract letters. The following options can be configured:

- `letters`: Specifies whether to extract letters from the string. Combining marks (accents, etc.) are extracted together.
- `numbers`: Specifies whether to extract numbers from the string.
- `specialCharacters`: Specifies whether to extract special characters from the string. ZWJ/variation selectors that join emoji sequences are extracted together.
- `whiteSpace`: Specifies whether to extract whitespace from the string.

It does not break combining marks in NFD-normalized strings or ZWJ-joined emoji sequences, and control characters that distort display (RLO, ZWSP, etc.) are always removed regardless of the options.

<br />

## Code

[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractChars/index.ts)

<br />

## Interface

```ts title="typescript"
interface ExtractCharsOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

function extractChars(
  value: string,
  options?: ExtractCharsOptions // default: { letters: true }
): string;
```

<br />

## Usage

```ts title="typescript"
import { extractChars } from '@modern-kit/utils';

const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

const letterOnly = extractChars(input); // 'Hello世界안녕하세요こんにちは'

const lettersAndWhiteSpace = extractChars(input, {
  letters: true,
  whiteSpace: true,
}); // 'Hello 世界 안녕하세요  こんにちは      '

const numbersAndSpecialCharacters = extractChars(input, {
  numbers: true,
  specialCharacters: true,
}); // ',!123$100+200=300!😄'

// Combining marks are preserved with letters (NFD-normalized string)
extractChars('José'.normalize('NFD'), { letters: true }); // 'José'

// Emoji sequences are not broken apart
extractChars('가족 👨‍👩‍👧', { specialCharacters: true }); // '👨‍👩‍👧'
```
