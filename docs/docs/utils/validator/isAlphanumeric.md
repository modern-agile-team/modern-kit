# isAlphanumeric

주어진 문자열이 `알파벳과 숫자`로만 구성되어 있는지 확인하는 함수입니다.

정규표현식을 사용하여 문자열이 알파벳(a-z, A-Z)과 숫자(0-9)로만 이루어져 있는지 검사합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isAlphanumeric/index.ts)

## Interface
```ts title="typescript"
const isAlphanumeric: (value: string) => boolean
```

## Usage
```ts title="typescript"
import { isAlphanumeric } from '@modern-kit/utils';

isAlphanumeric('abc'); // true
isAlphanumeric('123'); // true
isAlphanumeric('abc123'); // true

isAlphanumeric('abc123!'); // false
isAlphanumeric('abc 123'); // false
isAlphanumeric(''); // false
isAlphanumeric(😂); // false
isAlphanumeric("한글"); // false
```