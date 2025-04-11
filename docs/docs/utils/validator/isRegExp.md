# isRegExp

주어진 인자가 `RegExp` 인지 검사하고, 맞다면 인자의 타입을 `RegExp`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isRegExp/index.ts)

## Interface
```ts title="typescript"
function isRegExp(value: unknown): value is RegExp
```

## Usage 
```ts title="typescript"
import { isRegExp } from '@modern-kit/utils';

isRegExp(/abc/); // true
isRegExp(new RegExp('abc')); // true

isRegExp('abc'); // false
isRegExp(123); // false
isRegExp({}); // false
isRegExp([]); // false
isRegExp(null); // false
isRegExp(undefined); // false
isRegExp(() => {}); // false
isRegExp(Symbol('test')); // false
```