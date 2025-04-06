# percentage

값과 총 값을 받아 `백분율`을 계산하는 함수

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/percentage/index.ts)

## Interface
```ts title="typescript"
function percentage(value: number, total: number): number
```

## Usage
```ts title="typescript"
import { percentage } from '@modern-kit/utils';

const result1 = percentage(10, 100); // 10
const result2 = percentage(66.666, 100); // 66.67
```
