# removeLetters

주어진 문자열에서 특정 옵션에 따라 문자를 제거하는 함수입니다.

기본적으로 `문자만 제거`합니다. 아래와 같은 옵션을 설정할 수 있습니다:
- `letters`: 문자열에서 문자를 제거할지 여부를 지정합니다.
- `numbers`: 문자열에서 숫자를 제거할지 여부를 지정합니다.
- `specialCharacters`: 문자열에서 특수 문자를 제거할지 여부를 지정합니다.
- `whiteSpace`: 문자열에서 공백을 제거할지 여부를 지정합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/removeLetters/index.ts)

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
