# drop

배열의 첫 요소부터 n개의 요소가 삭제된 새로운 배열을 반환합니다.

배열 외에 별도의 인자가 없는 경우 첫 번째 요소만 삭제된 새로운 배열을 반환합니다.

배열의 길이보다 제거하고자 하는 index값이 더 큰 경우 빈 배열을 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/drop/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/drop|7,920,294.48|0.0001|`fastest`|
|lodash/drop|2,854,814.00|0.0004|`slowest`|

- **modern-kit/drop**
  - `2.77x` faster than lodash/drop


## Interface
```ts title="typescript"
function drop<T>(target: T[], count: number = 1): T[]
```

## Usage
```ts title="typescript"
import { drop } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(drop(arr)); // [2, 3, 4, 5]
console.log(drop(arr, 0)); // [1, 2, 3, 4, 5]
console.log(drop(arr, 2);); // [3, 4, 5]
console.log(drop(arr, 7)); // []
```