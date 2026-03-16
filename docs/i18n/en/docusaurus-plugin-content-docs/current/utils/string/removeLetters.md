# removeLetters

A function that removes characters from a given string according to the specified options.

By default, it `removes letters only`. The following options can be configured:
- `letters`: Specifies whether to remove letters from the string.
- `numbers`: Specifies whether to remove numbers from the string.
- `specialCharacters`: Specifies whether to remove special characters from the string.
- `whiteSpace`: Specifies whether to remove whitespace from the string.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/removeLetters/index.ts)

<br />

## Interface
```ts title="typescript"
interface RemoveCharactersOptions {
  letters?: boolean; // default: true
  numbers?: boolean; // default: false
  specialCharacters?: boolean; // default: false
  whiteSpace?: boolean; // default: false
}

function removeLetters(value: string, options?: RemoveCharactersOptions): string
```

<br />

## Usage
```ts title="typescript"
import { removeLetters } from '@modern-kit/utils';

const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300! 😄';

const removeLetterOnly = removeLetters(input); // ', !  123  $100 + 200 = 300! 😄'

const removeLettersAndWhiteSpace = removeLetters(input, {
  letters: true,
  whiteSpace: true,
}); // ',!123$100+200=300!😄'

const removeNumbersAndSpecialCharacters = removeLetters(input, {
  numbers: true,
  specialCharacters: true,
}); // 'Hello 世界 안녕하세요  こんにちは      '

const withoutAllCharacters = removeLetters(input, {
  letters: true,
  numbers: true,
  specialCharacters: true,
  whiteSpace: true,
}); // ''
```
