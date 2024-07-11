# flattenDeepThenMap

중첩 배열의 모든 깊이를 평탄화 한 후 제공된 iteratee 함수를 사용하여 각 요소를 매핑합니다.

`arr.flat(Infinity).map(iteratee)`와 동일하게 동작하며, `타입 문제`를 개선합니다.

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flattenDeepThenMap/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/flattenDeepThenMap|1,587,624.53|0.0004|`fastest`|
|lodash/flattenDeep.map|1,222,383.95|0.0006|-|
|js built-in/flat(Infinity).map|330,750.78|0.0029|`slowest`|

- **modern-kit/flatten**
  - `1.30x` faster than lodash/flattenDeep.map
  - `4.80x` faster than js built-in/flat(Infinity).map

## Interface
```ts title="typescript"
/**
 * @description 중첩된 배열 타입을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입
 */
type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;
```
```ts title="typescript"
function flattenDeepThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

## Usage

```ts title="typescript"
import { flattenDeepThenMap } from '@modern-kit/utils';

const arr = [1, 2, [3, 4, [5, 6]]];
flattenDeepThenMap(arr, (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
