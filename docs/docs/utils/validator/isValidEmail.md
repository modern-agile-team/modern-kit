# isValidEmail

주어진 문자열이 `이메일 형식`을 준수하는지 확인하는 함수입니다.

[RFC 5322](https://www.ietf.org/rfc/rfc5322.txt) 기준의 정규표현식을 사용하였으며, 해당 함수에서 사용하는 정규식은 이메일 형태의 `99.99%`를 검사를 할 수 있습니다.

참고로, 완벽한 이메일 정규식은 존재하지 않기 때문에 `99.99%` 입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidEmail/index.ts)

## Interface
```ts title="typescript"
const isValidEmail: (email: string) => boolean
```

## Usage
```ts title="typescript"
import { isValidEmail } from '@modern-kit/utils';

const isEmail1 = isValidEmail('example@email.com'); // true
const isEmail2 = isValidEmail('invalid-email'); // false
```

## Note
- [RFC 5322](https://www.ietf.org/rfc/rfc5322.txt)
- [emailregex](https://emailregex.com/)