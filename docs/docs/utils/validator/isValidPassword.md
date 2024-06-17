# isValidPassword

**[KISA-한국 인터넷 진흥원](https://www.kisa.or.kr/)** 의 패스워드 규칙을 기반으로 `패스워드 유효성 감사`를 할 수 있는 유틸 함수입니다.

유효성 결과인 `isValid`와 유효성 검사 실패 시 사유를 담는 `errorReason`을 포함한 객체를 반환합니다.

- 💡 요구사항에 맞게 `추상화`하여 사용하는 것을 권장합니다. 문서 하단의 `Best Practice`를 참고해주세요.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isValidPassword/index.ts)

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
  maxLength: number; // default: 16
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

## Usage
### Default
패스워드의 `최대/최소 길이`, `한글 포함 여부`, `공백 포함 여부`, `한글 포함 여부`의 기본적인 유효성 검사를 진행합니다.
- 기본적으로 패스워드의 최소 길이는 `8`, 최대 길이는 `16`이며, `공백`과 `한글` 포함을 금지합니다.
```ts title="typescript"
import { isValidPassword } from '@modern-kit/utils';

isValidPassword('12345678');
// { isValid: true, errorReason: null }
isValidPassword('1234');
// { isValid: false, errorReason: 'length' }
isValidPassword('password123456789');
// { isValid: false, errorReason: 'length' }
isValidPassword('    password    ');
// { isValid: false, errorReason: 'whiteSpace' }
isValidPassword('password한글');
// { isValid: false, errorReason: 'hangul' }
```

### maxRepeatChars
`특정 문자가 연속으로 등장 최대 횟수`를 검증합니다.
- 기본적으로 `maxLength + 1`을 갖습니다.
```ts title="typescript"
isValidPassword('PPPassword', { maxRepeatChars: 3 });
// { isValid: false, errorReason: 'consecutiveCharacters' }
```

### forbiddenPasswords
사용자가 직접 등록한 `금지 패스워드 리스트`에 패스워드 값이 포함되는지 검증합니다.
- `12345678`, `admin`, `iloveyou` 등의 특정 패스워드를 방지하는데 유용합니다.
```ts title="typescript"
isValidPassword(12345678, { forbiddenPasswords: ['12345678', 'admin'] });
// { isValid: false, errorReason: 'forbidden' }
```

### containsOptions
**[KISA-안전한 패스워드](https://www.privacy.go.kr/pds/passwd_encrypt.pdf)** 에서 가이드하는 문자 종류들의 포함 여부를 검증 할 수 있는 옵션입니다.

1. **lowerCase**: `알파벳 소문자`가 포함되어 있는지 유효성 검사를 진행합니다.
```ts title="typescript"
isValidPassword('12345678', { containsOptions: { lowerCase: true } });
// { isValid: false, errorReason: 'lowerCase' }
```

2. **number**: `숫자`가 포함되어 있는지 유효성 검사를 진행합니다.
```ts title="typescript"
isValidPassword('password', {
  containsOptions: { lowerCase: true, number: true },
});
// { isValid: false, errorReason: 'number' }
```

3. **specialCharacters**: `특수문자`가 포함되어 있는지 유효성 검사를 진행합니다.
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

4. **upperCase**: `알파벳 대문자`가 포함되어 있는지 유효성 검사를 진행합니다.
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
요구사항에 맞게 `추상화`하여 사용하는 것을 추천드립니다.
 
```ts
const validatorPassword = (password: string) => {
  return isValidPassword(password, {
    minLength: 8, // 패스워드 최소 길이 8
    maxLength: 20, // 패스워드 최대 길이 20
    maxRepeatChars: 3, // 같은 문자가 3번 이상 반복되는지 체크
    containsOptions: { 
      lowerCase: true, // 소문자 포함 체크
      number: true, // 숫자 포함 체크
      specialCharacters: true, // 특수문자 포함 체크
    },
  });
}
```

## Note
- [KISA-패스워드 선택 및 이용 안내서](https://www.privacy.go.kr/pds/passwd_encrypt.pdf)