# isBoolean

주어진 인자가 `불리언`인지 검사하고, 맞다면 인자의 타입을 `boolean`으로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isBoolean/index.ts)

## Interface
```ts title="typescript"
const isBoolean: (arg: unknown) => arg is boolean
```

## Usage
```ts title="typescript"
import { isBoolean } from '@modern-kit/utils';

isBoolean(true); // true
isBoolean(false); // true

isBoolean(123); // false
isBoolean('123'); // false
isBoolean(() => {}); // false
isBoolean({}); // false
isBoolean([]); // false
```