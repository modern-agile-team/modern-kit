# isValidEmail

A function that checks whether a given string conforms to the email format.

The regex based on [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt) is used, and the regex used by the function can check for `99.99%` of emails.

Note that this is `99.99%` because perfect email regex don't exist.

<br />

## Interface
```tsx
const isValidEmail: (email: string) => boolean
```

## Usage
```ts
import { isValidEmail } from '@devgrace/utils';

const isEmail1 = isValidEmail('example@email.com'); // true
const isEmail2 = isValidEmail('invalid-email'); // false
```

## Note
[RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)

[emailregex](https://emailregex.com/)