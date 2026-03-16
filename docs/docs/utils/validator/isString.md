# isString

주어진 인자가 `문자열`인지 검사하고, 맞다면 인자의 타입을 `string`으로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isString/index.ts)

## Interface
```ts title="typescript"
const isString: (arg: unknown) => arg is string
```

<br />

## Usage
```ts title="typescript"
import { isString } from '@modern-kit/utils';

isString('123'); // true

isString(123); // false
isString(() => {}); // false
isString(true); // false
isString({}); // false
isString([]); // false
```
