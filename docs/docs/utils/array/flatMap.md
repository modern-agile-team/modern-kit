# flatMap

각 배열 요소를 iteratee 함수로 매핑하고 지정된 깊이까지 결과를 평탄화합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMap/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/flatMap|294,327,51|0.0034|`fastest`|
|lodash/flatMapDepth|267,170,29|0.0037|-|
|js built-in/map.flat|82,654,90|0.0121|`slowest`|

- **modern-kit/flatMap**
  - `1.10x` faster than lodash/flatMapDepth
  - `3.56x` faster than js built-in/map.flat

## Interface
```ts title="typescript"
type FlatArray<Arr, Depth extends number> = {
    "done": Arr,
    "recur": Arr extends ReadonlyArray<infer InnerArr>
        ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
        : Arr
}[Depth extends -1 ? "done" : "recur"];
```
```ts title="typescript"
function flatMap<T, U, D extends number>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => U,
  depth?: D
): FlatArray<U[], D>[];
```

## Usage
```ts title="typescript"
import { flatMap } from '@modern-kit/utils';

const arr = [1, 2, 3];

flatMap(arr, (item: number) => [item, item]);
// [1, 1, 2, 2, 3, 3]

flatMap(arr, (item: number) => [[item, item]], 2);
// [1, 1, 2, 2, 3, 3]
```
