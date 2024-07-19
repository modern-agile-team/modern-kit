# range

`주어진 범위 내의 숫자 배열`을 생성합니다.

`하나의 인자`만 들어오는 경우 `0부터 해당 값 전까지의 숫자 배열`을 생성합니다.

`두 개의 인자`가 들어오는 경우 `첫 번째 인자값을 포함`하여 `두 번째 인자값 전까지의 숫자 배열`을 생성하며, `음수` 사이의 간격도 구할 수 있습니다.

`세 번째 인자`로 `간격(step)`을 명시해주면, 첫 번째 인자값부터 두 번째 인자값 전까지의 숫자 중 `주어진 간격만큼 떨어진 값들을 포함하는 배열을 생성`합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/range/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/range|5,006,149.95|0.0002|`fastest`|
|lodash/range|3,468,585.03|0.0003|`slowest`|

- **modern-kit/range**
  - `1.44x` faster than lodash/range

## Interface
```ts title="typescript"
// 함수 오버로딩
function range(end: number): number[];
function range(start: number, end: number): number[];
function range(start: number, end: number, step: number): number[];
```

## Usage
### Default
```ts title="typescript"
import { range } from '@modern-kit/utils';

const result1 = range(5); // [0, 1, 2, 3, 4]
const result2 = range(1, 6); // [1, 2, 3, 4, 5]
const result3 = range(1, 6, 2); // [1, 3, 5]
const result4 = range(-10, -5, 1); // [-10, -9, -8, -7, -6]
const result5 = range(10, 5, -1); // [10, 9, 8, 7, 6]
```
