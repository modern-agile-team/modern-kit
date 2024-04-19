# isValidPhoneNumberFormat

a function to check if the given string is in the form of a phone number with `-(hyphen)`.

- `XXX-YYY-ZZZZ`
- `XXX-YYYY-ZZZZ`
- `XX-YYY-ZZZZ`
- `XX-YYYY-ZZZZ`
- `XXXX-YYYY`

We don't strictly check to see if they match the actual phone numbering system. 

<br />

## Interface
```tsx
const isValidPhoneNumberFormat: (value: string) => boolean
```

## Usage
```ts
import { isValidPhoneNumberFormat, formatPhoneNumber } from '@devgrace/utils';

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