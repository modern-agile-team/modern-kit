# reverseString

주어진 문자열을 뒤집은 형태로 반환해주는 함수입니다.

일반적으로 JS의 split-reverse-join을 사용하는 경우 유효하지 않은 유니코드에 대한 처리를 할 수 없지만, 해당 함수를 사용하면 정상적으로 처리가 가능합니다.

유효하지 않은 값이 들어오는 경우 빈 문자열을 반환해줍니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/reverseString/index.ts)

## Interface
```ts title="typescript"
const reverseString: (value: string) => string
```

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