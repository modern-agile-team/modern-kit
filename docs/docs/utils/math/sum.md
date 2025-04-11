# sum

배열 요소의 `합`을 반환합니다.

기본적으로 `숫자 배열`의 합을 반환하며, 그 외 타입의 배열은 두 번째 인자인 `iteratee` 함수 결과로 `합`을 판단할 수 있습니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/math/sum/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/sum|21,825,119.56|0.0000|`fastest`|
|lodash/sum|7,861,063.97|0.0001|-|

- **modern-kit/sum**
  - `2.78x` faster than lodash/sum

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/sum with iteratee|15,978,576.34|0.0001|`fastest`|
|lodash/sumBy|4,471,676.86|0.0002|-|

- **modern-kit/sum with iteratee**
  - `3.57x` faster than lodash/sumBy

## Interface
```ts title="typescript"
// 함수 오버로딩
function sum(arr: number[] | readonly number[]): number;

function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;
```

## Usage
### Default
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [1, 2, 3, 4, 5];
const result = sum(arr); // 15
```

### Iteratee
```ts title="typescript"
import { sum } from '@modern-kit/utils';

const arr = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
];
const result = sum(arr, (item) => item.value); // 15
```
