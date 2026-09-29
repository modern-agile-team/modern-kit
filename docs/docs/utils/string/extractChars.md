# extractChars

주어진 문자열에서 특정 옵션에 따라 문자를 추출하는 함수입니다.

기본적으로 `문자만 추출`합니다. 아래와 같은 옵션을 설정할 수 있습니다:
- `letters`: 문자열에서 문자를 추출할지 여부를 지정합니다. 결합 문자(악센트 등)도 함께 추출됩니다.
- `numbers`: 문자열에서 숫자를 추출할지 여부를 지정합니다.
- `specialCharacters`: 문자열에서 특수 문자를 추출할지 여부를 지정합니다. 이모지 시퀀스를 잇는 ZWJ/변형 선택자도 함께 추출됩니다.
- `whiteSpace`: 문자열에서 공백을 추출할지 여부를 지정합니다.

NFD 정규화된 문자열의 결합 문자나 ZWJ 로 이어진 이모지 시퀀스를 분해하지 않으며, 표시를 왜곡하는 제어 문자(RLO, ZWSP 등)는 옵션과 무관하게 제거됩니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractChars/index.ts)

<br />

## Interface
```ts title="typescript"
interface ExtractCharsOptions {
  letters?: boolean; // default: true
  numbers?: boolean; // default: false
  specialCharacters?: boolean; // default: false
  whiteSpace?: boolean; // default: false
}

function extractChars(value: string, options?: ExtractCharsOptions): string
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

// 결합 문자는 문자와 함께 보존됩니다 (NFD 정규화된 문자열)
extractChars('José'.normalize('NFD'), { letters: true }); // 'José'

// 이모지 시퀀스는 분해되지 않습니다
extractChars('가족 👨‍👩‍👧', { specialCharacters: true }); // '👨‍👩‍👧'
```
