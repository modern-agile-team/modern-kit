# flatMapDeep

배열의 각 요소에 iteratee 함수를 적용하고 결과를 모든 깊이로 평탄화합니다.

`arr.map.flat(Infinity)`와 동일하게 동작하지만, 성능적으로 더 우수합니다.

<br />

## Code
[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMapDeep/index.ts)

<br />

## Benchmark
- `hz`: 초당 작업 수
- `mean`: 평균 응답 시간(ms)

| 이름 | hz | mean | 성능 |
| --- | --- | --- | --- |
| modern-kit/flatMapDeep | 251,685.91 | 0.0040 | `fastest` |
| lodash/flatMapDeep.map | 184,467.29 | 0.0054 | - |
| js built-in/map.flat | 57,011.35 | 0.0175 | `slowest` |

- **modern-kit/flatMapDeep**
  - `1.35x` faster than lodash/flatMapDeep.map
  - `4.41x` faster than js built-in/map.flat

<br />

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
function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

<br />

## Usage

```ts title="typescript"
import { flatMapDeep } from '@modern-kit/utils';

const arr = [1, 2, [3, 4, [5, 6]]];
flatMapDeep(arr, (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
