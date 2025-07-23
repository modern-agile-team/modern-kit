# isHangulAlphanumeric

주어진 문자열이 `한글 또는 알파벳 또는 숫자`로만 구성되어 있는지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isHangulAlphanumeric/index.ts)

## Interface
```ts title="typescript"
const isHangulAlphanumeric: (value: string) => boolean
```

## Usage
```ts title="typescript"
import { isHangulAlphanumeric } from '@modern-kit/utils';

isHangulAlphanumeric('안녕하세요'); // true
isHangulAlphanumeric('Hello123'); // true 
isHangulAlphanumeric('123'); // true

isHangulAlphanumeric('!@#'); // false
isHangulAlphanumeric(''); // false
```