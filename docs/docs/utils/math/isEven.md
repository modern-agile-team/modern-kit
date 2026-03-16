# isEven

주어진 숫자가 `짝수`인지 확인하는 함수입니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/isEven/index.ts)

<br />

## Interface
```ts title="typescript"
function isEven(value: number): boolean;
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { isEven } from '@modern-kit/utils';

// 짝수 확인
isEven(2); // true
isEven(0); // true
isEven(100); // true
isEven(-2); // true

// 홀수 확인
isEven(3); // false
isEven(1); // false
isEven(-1); // false
isEven(-33); // false
```
