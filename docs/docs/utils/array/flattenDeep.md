# flattenDeep

**[flatten](https://modern-agile-team.github.io/modern-kit/docs/utils/array/flatten)** 을 기반으로 `모든 깊이의 중첩 배열`을 `평탄화`해주는 함수입니다.

JavaScript에서 기본적으로 제공하는 **[Array.prototype.flat(Infinity)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)** 와 비교했을 때 `성능면에서 더 우수`하며, 더욱 `정확한 타입 추론`을 할 수 있습니다.

```ts title="typescript"
// as-is 
// Array.prototype.flat(Infinity)
const arr = [1, [2, [3]]].flat(Infinity);
/*
 * const arr: FlatArray<number | (number | number[])[], 0 | 1 | 2 | 3 | -1 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20>[]
 */
```
```ts title="typescript"
// to-be 
// flattenDeep
const arr = flattenDeep([1, [2, [3]]]);
/*
 * const arr: number[]
 */
```

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flattenDeep/index.ts)

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

|이름|hz|mean|성능|
|------|---|---|---|
|modern-kit/flattenDeep|2,028,846.09|0.0005|`fastest`|
|lodash/flattenDeep|1,481,161.98|0.0007|-|
|js built-in/flat(Infinity)|340,193.06|0.0029|`slowest`|

- **modern-kit/flattenDeep**
  - `1.40x` faster than lodash/flattenDeep
  - `5.99x` faster than js built-in/flat(Infinity)

## Interface
```ts title="typescript"
/**
 * @description 중첩된 배열 타입을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입
 */
type ExtractNestedArrayType<T> = T extends readonly (infer U)[] ? ExtractNestedArrayType<U> : T;
```
```ts title="typescript"
function flattenDeep<T>(arr: T[] | readonly T[]): ExtractNestedArrayType<T>[]
```

## Usage
```ts title="typescript"
import { flattenDeep } from '@modern-kit/utils';

const arr = [1, [2, [3, [4, [5]]]]];

flattenDeep(arr); // [1, 2, 3, 4, 5]
```
