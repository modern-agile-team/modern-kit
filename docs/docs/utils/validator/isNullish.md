# isNullish

주어진 인자가 `null` 또는 `undefined`인지 검사하고, 맞다면 인자 타입이 `undefined | null`로 좁혀주는 함수입니다.

<br />

## Interface
```tsx title="typescript"
const isNullish: <T>(val: T | null | undefined) => val is null | undefined
```

## Usage
```ts
import { isNullish } from '@modern-kit/utils';

isNullish(undefined); // true
isNullish(null); // true

isNullish(1); // false
isNullish(false); // false
isNullish("str"); // false
isNullish({}); // false
```
