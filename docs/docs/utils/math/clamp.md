# clamp

`주어진 값`을 `최소값과 최대값 사이로 제한`합니다.

입력된 값이 최소값보다 작으면 최소값을, 최대값보다 크면 최대값을 반환합니다. 값이 범위 내에 있다면 그대로 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/clamp/index.ts)

## Interface
```ts title="typescript"
function clamp(value: number, min: number, max: number): number;
```

## Usage
### Default
```ts title="typescript"
import { clamp } from '@modern-kit/utils';

const result1 = clamp(5, 0, 10); // 5
const result2 = clamp(-5, 0, 10); // 0
const result3 = clamp(15, 0, 10); // 10
const result4 = clamp(3.5, 2.1, 4.9); // 3.5
```