# isNumber

주어진 인자가 `숫자`인지 검사하고, 맞다면 인자의 타입을 `number`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNumber/index.ts)

## Interface
```ts title="typescript"
const isNumber: (arg: unknown) => arg is number
```

<br />

## Usage
```ts title="typescript"
import { isNumber } from '@modern-kit/utils';

isNumber(123); // true

isNumber(() => {}); // false
isNumber('123'); // false
isNumber(true); // false
isNumber({}); // false
isNumber([]); // false
```
