# excludeChars

주어진 문자열에서 특정 옵션에 따라 문자를 제외하는 함수입니다.

지정한 유형을 남기는 `extractChars`와 정반대로, 지정한 유형을 걷어냅니다.

기본적으로 `문자만 제외`합니다(`{ letters: true }`). `options`를 전달하면 지정하지 않은 옵션은 모두 `false`로 취급되므로, 문자도 함께 제외하려면 `letters: true`를 명시해야 합니다. 아래와 같은 옵션을 설정할 수 있습니다:

- `letters`: 문자열에서 문자를 제외할지 여부를 지정합니다. 결합 문자(악센트 등)도 함께 제외됩니다.
- `numbers`: 문자열에서 숫자를 제외할지 여부를 지정합니다.
- `specialCharacters`: 문자열에서 특수 문자를 제외할지 여부를 지정합니다.
- `whiteSpace`: 문자열에서 공백을 제외할지 여부를 지정합니다.

<br />

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/excludeChars/index.ts)

<br />

## Interface

```ts title="typescript"
interface ExcludeCharsOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

function excludeChars(
  value: string,
  options?: ExcludeCharsOptions // default: { letters: true }
): string;
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

// 결합 문자는 분해되지 않습니다
excludeChars('José'.normalize('NFD'), { numbers: true }); // 'José'
```
