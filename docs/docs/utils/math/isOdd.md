# isOdd

주어진 숫자가 `홀수`인지 확인하는 함수

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/isOdd/index.ts)

## Interface
```ts title="typescript"
function isOdd(value: number): boolean;
```

## Usage
```ts title="typescript"
import { isOdd } from '@modern-kit/utils';

// 홀수 확인
isOdd(3); // true
isOdd(1); // true
isOdd(-1); // true
isOdd(-33); // true

// 짝수 확인
isOdd(2); // false
isOdd(0); // false
isOdd(100); // false
isOdd(-2); // false
```
