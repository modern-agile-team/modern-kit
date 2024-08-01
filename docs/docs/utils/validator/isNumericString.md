# isNumericString

주어진 문자열이 숫자(0-9)로만 구성되어 있는지 확인하는 함수입니다.

- 주어진 문자열 `value`가 오직 숫자로만 이루어져 있는지를 검사합니다.
- 반환 값은 `boolean`으로, 숫자 문자열일 경우 `true`, 그렇지 않은 경우 `false`를 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNumericString/index.ts)

## Interface
```ts title="typescript"
function isNumericString(value: string): boolean
```

## Usage
```ts title="typescript"
import { isNumericString } from '@modern-kit/utils';

isNumericString("123") // true
isNumericString("0") // true

isNumericString("-123") // false
isNumericString("1a") // false
isNumericString("1@") // false
isNumericString("1[]") // false
isNumericString("12.00") // false
isNumericString(" ") // false
```