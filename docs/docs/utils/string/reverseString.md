# reverseString

주어진 문자열을 뒤집어 반환하는 함수입니다.

`spread` 연산자를 사용하여 `유니코드 문자열`을 지원합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/reverseString/index.ts)

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
