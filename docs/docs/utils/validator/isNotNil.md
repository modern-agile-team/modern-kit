# isNotNil

주어진 인자가 `null` 또는 `undefined`가 아닌지 검사하고, 아니라면 주어진 인자 타입 그대로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNotNil/index.ts)

## Interface
```ts title="typescript"
const isNotNil: <T>(val: T | null | undefined) => val is T
```

## Usage
```ts title="typescript"
import { isNotNil } from '@modern-kit/utils';

isNotNil(1); // true
isNotNil(false); // true
isNotNil("str"); // true
isNotNil({}); // true

isNotNil(undefined); // false
isNotNil(null); // false
```
