# formatPhoneNumber

A function that takes a `string` and returns it in `phone number format` with a `-(hyphen)`.

<br />

## Interface
```tsx
const formatPhoneNumber: (value: string) => string
```

## Usage
```ts
import { formatPhoneNumber } from '@devgrace/utils';

const phoneNumber0 = formatPhoneNumber('03112345678'); // '031-1234-5678'
const phoneNumber1 = formatPhoneNumber('01012345678'); // '010-1234-5678'
const phoneNumber2 = formatPhoneNumber('021231234'); // '02-123-1234'
const phoneNumber2 = formatPhoneNumber('(02)12351234'); // '02-1235-1234'
const phoneNumber3 = formatPhoneNumber('12334788'); // '1233-4788'
```

## Note
[South Korea's phone numbering system](https://en.wikipedia.org/wiki/Telephone_numbers_in_South_Korea)