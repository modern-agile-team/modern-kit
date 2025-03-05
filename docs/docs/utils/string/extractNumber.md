# extractNumber

문자열에서 `숫자만 추출`하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/string/extractNumber/index.ts)

## Interface
```ts title="typescript"
function extractNumber(value: string): string
```

## Usage
```ts title="typescript"
import { extractNumber } from '@modern-kit/utils';

const str1 = extractNumber('abc123sd45'); // '12345'
const str2 = extractNumber('1 23 sd 4 5'); // '12345'
const str3 = extractNumber('🥲'); // ''
const str4 = extractNumber('   '); // ''
```