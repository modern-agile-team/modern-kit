# extractLetters

A function that extracts characters from a given string according to the specified options.

By default, it `extracts letters only`. The following options can be configured:
- `letters`: Specifies whether to extract letters from the string.
- `numbers`: Specifies whether to extract numbers from the string.
- `specialCharacters`: Specifies whether to extract special characters from the string.
- `whiteSpace`: Specifies whether to extract whitespace from the string.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractLetters/index.ts)

<br />

## Interface
```ts title="typescript"
interface ExtractLettersOptions {
  letters?: boolean; // default: true
  numbers?: boolean; // default: false
  specialCharacters?: boolean; // default: false
  whiteSpace?: boolean; // default: false
}

function extractLetters(value: string, options?: ExtractLettersOptions): string
```

<br />

## Usage
```ts title="typescript"
import { extractLetters } from '@modern-kit/utils';

const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

const letterOnly = extractLetters(input); // 'Hello世界안녕하세요こんにちは'

const lettersAndWhiteSpace = extractLetters(input, {
  letters: true,
  whiteSpace: true,
}); // 'Hello 世界 안녕하세요  こんにちは      '

const numbersAndSpecialCharacters = extractLetters(input, {
  numbers: true,
  specialCharacters: true,
}); // ',!123$100+200=300!😄'

const allCharacters = extractLetters(str, {
  letters: true,
  numbers: true,
  specialCharacters: true,
  whiteSpace: true,
}); // 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄'
```
