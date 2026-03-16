# clamp

`주어진 값`을 `최솟값과 최댓값 사이로 제한`합니다.

입력된 값이 최솟값보다 작으면 최솟값을, 최댓값보다 크면 최댓값을 반환합니다. 값이 범위 내에 있다면 그대로 반환합니다.

만약 최댓값이 제공되지 않은 경우, 두 번째 인자는 최댓값으로 간주됩니다. 그리고 입력값과 최댓값 중 작은 값을 반환합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/number/clamp/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/clamp | 18,471,965.06 | 0.0001 | `fastest` |
| lodash/clamp | 10,097,932.96 | 0.0001 | - |

- **modern-kit/clamp**
  - `1.83x` faster than lodash/clamp

<br />

## Interface
```ts title="typescript"
function clamp(value: number, max: number): number;
function clamp(value: number, min: number, max: number): number;
```

<br />

## Usage
### 기본 사용법
```ts title="typescript"
import { clamp } from '@modern-kit/utils';

clamp(3, 5); // 3
clamp(10, 6); // 6
clamp(7, 0, 10); // 7
clamp(10, 0, 5); // 5
clamp(-5, 0, 10); // 0
```
