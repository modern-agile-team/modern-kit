# deepFlatThenMap

deepFlatThenMap은 모든 깊이의 배열을 평탄화 한 후 각 요소에 콜백 함수를 적용하는 함수입니다. 

반면에 **[lodash의 flatMapDeep](https://lodash.com/docs/4.17.15#flatMapDeep)** 은 먼저 각 요소에 `map`을 적용한 후, 평탄화하는 함수로 동작상의 차이가 있습니다.

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/deepFlatThenMap/index.ts)

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
/**
 * @example deepFlatThenMap([1, 2, [3, 4, [5, 6]]])
 */
export function deepFlatThenMap<T>(
  arr: T[] | readonly T[]
): ExtractNestedArrayType<T>[];

/**
 * @example deepFlatThenMap([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }))
 */
export function deepFlatThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

## Usage

```ts title="typescript"
import { deepFlatThenMap } from '@modern-kit/utils';

deepFlatThenMap([1, 2, [3, 4, [5, 6]]]); // [1, 2, 3, 4, 5, 6]

deepFlatThenMap([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
