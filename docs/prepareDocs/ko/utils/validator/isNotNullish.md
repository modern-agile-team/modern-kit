# isNotNullish

주어진 인자가 `null` 또는 `undefined`가 아닌지 검사하고, 아니라면 주어진 인자 타입 그대로 좁혀주는 함수입니다.

<br />

## Interface
```tsx title="typescript"
const isNotNullish: <T>(val: T | null | undefined) => val is T
```

## Usage
```ts
import { isNotNullish } from '@devgrace/utils';

isNotNullish(1); // true
isNotNullish(false); // true
isNotNullish("str"); // true
isNotNullish({}); // true

isNotNullish(undefined); // false
isNotNullish(null); // false
```
