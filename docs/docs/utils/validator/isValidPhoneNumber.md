# isValidPhoneNumber

주어진 문자열이 `-(hyphen)`을 포함한 전화번호 형식인지 확인하는 함수입니다.

- `XXX-YYY-ZZZZ`
- `XXX-YYYY-ZZZZ`
- `XX-YYY-ZZZZ`
- `XX-YYYY-ZZZZ`
- `XXXX-YYYY`

실제 전화번호 체계에 맞는지 엄격하게 확인하지는 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidPhoneNumber/index.ts)

## Interface
```ts title="typescript"
const isValidPhoneNumber: (value: string) => boolean
```

## Usage
```ts title="typescript"
import { isValidPhoneNumber, formatPhoneNumber } from '@modern-kit/utils';

isValidPhoneNumber('010-1234-1234'); // true
isValidPhoneNumber('031-123-1234'); // true
isValidPhoneNumber('02-123-1234'); // true
isValidPhoneNumber('02-1234-1234'); // true

isValidPhoneNumber('0-1234-1234'); // false
isValidPhoneNumber('010-12455-1234'); // false

isValidPhoneNumber(formatPhoneNumber('01012341234')); // true
isValidPhoneNumber(formatPhoneNumber('021231234')); // true
isValidPhoneNumber(formatPhoneNumber('010-1234-1234')); // true
```