# isInRange

주어진 value가 `min`과 `max`로 지정된 범위 내에 있는지 여부를 판단합니다.

`inclusiveMin`/`inclusiveMax`를 통해 경계 값을 포함할지 여부를 설정할 수 있습니다. 기본적으로 최소값은 포함하며 최대값은 포함하지 않습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/validator/isInRange/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/isInRange|24,435,490.55|0.0000|`fastest`|
|lodash/inRange|9,373,021.30|0.0001|`slowest`|

- **modern-kit/isInRange**
  - `2.61x` faster than lodash/inRange

<br />

## Interface
```ts title="typescript"
interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  inclusiveMin?: boolean;
  inclusiveMax?: boolean;
}

function isInRange({
  value,
  min,
  max,
  inclusiveMin,
  inclusiveMax,
}: IsInRangeProps): boolean;
```

<br />

## Usage
```ts title="typescript"
import { isInRange } from '@modern-kit/utils';

isInRange({ value: 5, min: 0, max: 10 }) // true
isInRange({ value: 0, min: 0, max: 10 }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: true }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: false, inclusiveMax: true }) // true
isInRange({ value: 10, min: 0, max: 10, inclusiveMin: true, inclusiveMax: true }) // true

// Error
isInRange({ value: 5, min: 10, max: 0 }) // Error('min은 max보다 작아야합니다.')
```
