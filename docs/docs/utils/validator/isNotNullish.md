# isNotNullish

주어진 인자가 `null` 또는 `undefined`가 아닌지 검사하고, 아니라면 주어진 인자 타입 그대로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNotNullish/index.ts)

## Interface
```ts title="typescript"
const isNotNullish: <T>(val: T | null | undefined) => val is T
```

## Usage
```ts title="typescript"
import { isNotNullish } from '@modern-kit/utils';

isNotNullish(1); // true
isNotNullish(false); // true
isNotNullish("str"); // true
isNotNullish({}); // true

isNotNullish(undefined); // false
isNotNullish(null); // false
```
