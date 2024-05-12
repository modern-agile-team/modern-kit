# isNullish

주어진 인자가 `null` 또는 `undefined`인지 검사하고, 맞다면 인자 타입이 `undefined | null`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNullish/index.ts)

## Interface
```ts title="typescript"
const isNullish: <T>(val: T | null | undefined) => val is null | undefined
```

## Usage
```ts title="typescript"
import { isNullish } from '@modern-kit/utils';

isNullish(undefined); // true
isNullish(null); // true

isNullish(1); // false
isNullish(false); // false
isNullish("str"); // false
isNullish({}); // false
```
