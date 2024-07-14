# isNil

주어진 인자가 `null` 또는 `undefined`인지 검사하고, 맞다면 인자 타입이 `undefined | null`로 좁혀주는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isNil/index.ts)

## Interface
```ts title="typescript"
const isNil: <T>(val: T | null | undefined) => val is null | undefined
```

## Usage
```ts title="typescript"
import { isNil } from '@modern-kit/utils';

isNil(undefined); // true
isNil(null); // true

isNil(1); // false
isNil(false); // false
isNil("str"); // false
isNil({}); // false
```
