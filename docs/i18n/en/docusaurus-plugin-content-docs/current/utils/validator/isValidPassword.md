# isValidPassword

A utility function for `password validation` based on the password rules of **[KISA - Korea Internet & Security Agency](https://www.kisa.or.kr/)**.

Returns an object containing `isValid` (the validation result) and `errorReason` (the reason for validation failure, if any).

- It is recommended to `abstract` the function to fit your specific requirements. See the `Best Practice` at the bottom of this page.

<br />

## Code
[🔗 View source code](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidPassword/index.ts)

## Interface
```ts title="typescript"
interface ContainsOptions {
  lowerCase?: boolean; // default: false
  number?: boolean; // default: false
  specialCharacters?: boolean; // default: false
  upperCase?: boolean; // default: false
}

interface IsValidPasswordOptions {
  containsOptions: ContainsOptions;
  minLength: number; // default: 8
  maxLength: number; // default: 24
  maxRepeatChars: number; // default: maxLength + 1
  forbiddenPasswords: string[] | readonly string[]; // default: []
}

type ErrorReason =
  | keyof ContainsOptions
  | 'forbidden'
  | 'whiteSpace'
  | 'consecutiveCharacters'
  | 'length';

interface IsValidPasswordReturnType {
  isValid: boolean;
  errorReason: ErrorReason | null;
}
```
```ts title="typescript"
const isValidPassword: (
  password: string,
  options?: Partial<IsValidPasswordOptions>
) => IsValidPasswordReturnType;
```

<br />

## Usage
### Default
Performs basic validation including `maximum/minimum length`, `presence of Hangul`, and `presence of whitespace`.
- By default, the minimum password length is `8`, maximum is `24`, and both `whitespace` and `Hangul` are forbidden.
```ts title="typescript"
import { isValidPassword } from '@modern-kit/utils';

isValidPassword('12345678');
// { isValid: true, errorReason: null }
isValidPassword('1234');
// { isValid: false, errorReason: 'length' }
isValidPassword('passwordpassword123456789');
// { isValid: false, errorReason: 'length' }
isValidPassword('    password    ');
// { isValid: false, errorReason: 'whiteSpace' }
isValidPassword('password한글');
// { isValid: false, errorReason: 'hangul' }
```

<br />

### maxRepeatChars
Validates the `maximum number of times a specific character can appear consecutively`.
- Defaults to `maxLength + 1`, meaning there is no restriction unless explicitly set.
```ts title="typescript"
isValidPassword('PPPassword', { maxRepeatChars: 3 });
// { isValid: false, errorReason: 'consecutiveCharacters' }
```

<br />

### forbiddenPasswords
Validates whether the password is included in a `user-defined list of forbidden passwords`.
- Useful for preventing specific passwords such as `12345678`, `admin`, `iloveyou`, etc.
```ts title="typescript"
isValidPassword('12345678', { forbiddenPasswords: ['12345678', 'admin'] });
// { isValid: false, errorReason: 'forbidden' }
```

<br />

### containsOptions
An option to validate the presence of specific character types as guided by **[KISA - Safe Passwords](https://www.privacy.go.kr/pds/passwd_encrypt.pdf)**.

1. **lowerCase**: Validates whether `lowercase alphabetic characters` are included.
```ts title="typescript"
isValidPassword('12345678', { containsOptions: { lowerCase: true } });
// { isValid: false, errorReason: 'lowerCase' }
```

2. **number**: Validates whether `digits` are included.
```ts title="typescript"
isValidPassword('password', {
  containsOptions: { lowerCase: true, number: true },
});
// { isValid: false, errorReason: 'number' }
```

3. **specialCharacters**: Validates whether `special characters` are included.
```ts title="typescript"
isValidPassword('password1', {
  containsOptions: {
    lowerCase: true,
    number: true,
    specialCharacters: true,
  },
});
// { isValid: false, errorReason: 'specialCharacters' }
```

4. **upperCase**: Validates whether `uppercase alphabetic characters` are included.
```ts title="typescript"
isValidPassword('password@1',  {
  containsOptions: {
    lowerCase: true,
    number: true,
    specialCharacters: true,
    upperCase: true
  },
});
// { isValid: false, errorReason: 'upperCase' }
```

<br />

### ⭐️ Best Practice
It is recommended to `abstract` the function to match your specific requirements.

```ts title="typescript"
const validatorPassword = (password: string) => {
  return isValidPassword(password, {
    minLength: 8, // minimum password length of 8
    maxLength: 20, // maximum password length of 20
    maxRepeatChars: 3, // check if the same character repeats 3 or more times
    containsOptions: {
      lowerCase: true, // check for lowercase letters
      number: true, // check for digits
      specialCharacters: true, // check for special characters
    },
  });
}
```

## References
- [KISA - Password Selection and Usage Guide](https://www.privacy.go.kr/pds/passwd_encrypt.pdf)
