# isFloat

주어진 인자가 유한한 부동소수점 숫자인지를 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isFloat/index.ts)

## Interface
```ts title="typescript"
const isFloat = (value: unknown) => value is number;
```

<br />

## Usage
```ts title="typescript"
import { isFloat } from '@modern-kit/utils';

isFloat(0.11886) // true
isFloat(175.5119687) // true
isFloat(-15.1175688775) // true

isFloat(100); // false
isFloat(''); // false
isFloat(null); // false
isFloat(NaN) // false
isFloat(Infinity) // false
isFloat(-Infinity) // false
isFloat([]) // false
isFloat({}) // false
```
