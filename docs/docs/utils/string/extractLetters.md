# extractLetters

임의의 문자열에 대해 선택한 문자 속성만 반영시킨 새로운 문자열을 생성하여 반환하는 메서드 입니다.
기본 설정은 언어로 사용되는 문자 `Letters`만 반영된 문자열을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractLetters/index.ts)

## Interface
```ts title="typescript"
interface Options {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

const extractLetters: (
  value: string,
  options?: Options
) => string;
```

## Usage
```ts title="typescript"
import { extractLetters } from '@modern-kit/utils';

const input = 'Hello, 世界! 안녕하세요 123 こんにちは $100 + 200 = 300!';

const letterOnly = extractLetters(input); // 'Hello世界안녕하세요こんにちは'

const lettersAndWhiteSpace = extractLetters(input, {
    letters: true,
    whiteSpace: true,
}); // 'Hello 世界 안녕하세요  こんにちは     '

const numbersAndSpecialCharacters = extractLetters(input, {
    numbers: true,
    specialCharacters: true,
}); // ',!123$100+200=300!'
```