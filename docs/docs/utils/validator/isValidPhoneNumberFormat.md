# isValidPhoneNumberFormat

주어진 문자열이 `-(hyphen)`을 포함한 전화번호 형식인지 확인하는 함수입니다.

- `XXX-YYY-ZZZZ`
- `XXX-YYYY-ZZZZ`
- `XX-YYY-ZZZZ`
- `XX-YYYY-ZZZZ`
- `XXXX-YYYY`

실제 전화번호 체계에 맞는지 엄격하게 확인하지는 않습니다.

<br />

## Interface
```tsx
const isValidPhoneNumberFormat: (value: string) => boolean
```

## Usage
```ts
import { isValidPhoneNumberFormat, formatPhoneNumber } from '@modern-kit/utils';

const isPhoneNumberFormat1 = isValidPhoneNumberFormat('010-1234-1234'); // true
const isPhoneNumberFormat2 = isValidPhoneNumberFormat('031-123-1234'); // true
const isPhoneNumberFormat3 = isValidPhoneNumberFormat('02-123-1234'); // true
const isPhoneNumberFormat4 = isValidPhoneNumberFormat('02-1234-1234'); // true

const isPhoneNumberFormat5 = isValidPhoneNumberFormat('0-1234-1234'); // false
const isPhoneNumberFormat6 = isValidPhoneNumberFormat('010-12455-1234'); // false

const isPhoneNumberFormat7 = isValidPhoneNumberFormat(formatPhoneNumber('01012341234')); // true
const isPhoneNumberFormat8 = isValidPhoneNumberFormat(formatPhoneNumber('021231234')); // true
const isPhoneNumberFormat9 = isValidPhoneNumberFormat(formatPhoneNumber('010-1234-1234')); // true
```