# extractNumber

`문자열`을 입력하면 숫자를 제외한 모든 문자를 제거한 문자열을 반환하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractNumber/index.ts)

## Interface
```ts title="typescript"
const extractNumber: (value: string) => string
```

## Usage
```ts title="typescript"
import { extractNumber } from '@modern-kit/utils';

const str1 = extractNumber('abc123sd45'); // '12345'
const str2 = extractNumber('1 23 sd 4 5'); // '12345'
const str3 = extractNumber('🥲'); // ''
const str4 = extractNumber('   '); // ''
```