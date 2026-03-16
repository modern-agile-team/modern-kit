# isValidPhoneNumber

A function that checks whether a given string conforms to a phone number format containing `-(hyphens)`.

The supported phone number formats are as follows:

- `XXX-YYY-ZZZZ`
- `XXX-YYYY-ZZZZ`
- `XX-YYY-ZZZZ`
- `XX-YYYY-ZZZZ`
- `XXXX-YYYY`

It does not strictly verify conformance to an actual phone numbering system.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidPhoneNumber/index.ts)

## Interface
```ts title="typescript"
const isValidPhoneNumber: (value: string) => boolean
```

<br />

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
