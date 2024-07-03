# flatMapDeep

js에서 제공하는 [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)은 배열을 `평탄화`하면서 주어진 요소들에 특정 콜백 함수를 적용 할 수 있습니다.

하지만 `flatMap`은 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)과 다르게 `depth 1`에서 밖에 유효하지 않습니다.

flatMapDeep은 기존 `flatMap`과 유사하나 `모든 중첩 배열을 평탄화`하면서, 동시에 `iteratee` 함수의 결과를 토대로 배열을 구성합니다.

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMapDeep/index.ts)

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
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]])
 */
export function flatMapDeep<T>(
  arr: T[] | readonly T[]
): ExtractNestedArrayType<T>[];

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }))
 */
export function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];
```

## Usage

```ts title="typescript"
import { flatMapDeep } from '@modern-kit/utils';

flatMapDeep([1, 2, [3, 4, [5, 6]]]); // [1, 2, 3, 4, 5, 6]
flatMapDeep([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
