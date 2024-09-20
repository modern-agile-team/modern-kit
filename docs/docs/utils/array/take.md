# take

배열의 첫 요소부터 n개의 요소를 가져온 새로운 배열을 반환합니다.

배열 외에 별도의 인자가 없는 경우 첫 번째 요소만 가져온 새로운 배열을 반환합니다.

배열의 길이보다 가져오고자 하는 index값이 더 큰 경우 전체 배열을 반환합니다.

가져오고자 하는 index가 음수인 경우에는 빈 배열을 반환합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/take/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/take|6,771,043.43|0.0001|`fastest`|
|lodash/take|2,601,105.35|0.0004|`slowest`|

- **modern-kit/take**
  - `2.60x` faster than lodash/take


## Interface
```ts title="typescript"
function take<T>(arr: T[] | readonly T[], count: number = 1): T[]
```

## Usage
```ts title="typescript"
import { take } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
console.log(take(arr)); // [1]
console.log(take(arr, 0)); // []
console.log(take(arr, 2);); // [1, 2]
console.log(take(arr, 7)); // [1, 2, 3, 4, 5]
```