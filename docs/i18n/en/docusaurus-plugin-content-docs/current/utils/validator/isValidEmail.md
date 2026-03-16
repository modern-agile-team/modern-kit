# isValidEmail

A function that checks whether a given string conforms to the `email format`.

It uses a regular expression based on the [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt) standard, and the regex used in this function can validate `99.99%` of email formats.

Note that a perfect email regular expression does not exist, hence `99.99%`.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidEmail/index.ts)

<br />

## Interface
```ts title="typescript"
const isValidEmail: (email: string) => boolean
```

<br />

## Usage
```ts title="typescript"
import { isValidEmail } from '@modern-kit/utils';

const isEmail1 = isValidEmail('example@email.com'); // true
const isEmail2 = isValidEmail('invalid-email'); // false
```

## References

- [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)
- [emailregex](https://emailregex.com/)
