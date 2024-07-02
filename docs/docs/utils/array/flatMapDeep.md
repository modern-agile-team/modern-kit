# flatMapDeep

js에서 제공하는 [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)은 배열을 `평탄화`하면서 주어진 요소들에 특정 콜백 함수를 적용 할 수 있습니다.

하지만 `flatMap`은 [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)과 다르게 `depth 1`에서 밖에 유효하지 않습니다.

flatMapDeep은 `flat`과 동일하게 depth(default: `1`)만큼 배열을 평탄화하면서, `iteratee` 함수의 결과를 토대로 배열을 구성하는 함수입니다.

lodash의 `flatMapDeep`, `flatMapDepth`와 다르게 `depth`에 따른 타입을 정확하게 추론합니다.

```ts title="typescript"
const arr = [1, 2, [3, 4, [5, 6]]];

const flattenArray1 = flatMapDeep(arr);
// const flattenArray1: (number | (number | number[])[])[]
// depth default: 1

const flattenArray2 = flatMapDeep(arr, 1);
// const flattenArray2: (number | (number | number[])[])[]

const flattenArray3 = flatMapDeep(arr, 2);
// const flattenArray3: (number | number[])[]
```
```ts title="typescript"
const arr = [1, 2, [3, 4, [5, 6]]];

const flattenArray1 = flatMapDeep(arr, 0, (item) => ({ id: item }));
// const flattenArray1: (number | (number | number[])[])[]
// depth가 자연수(1, 2, 3, ...)가 아니면 FlatArray가 적용됩니다.

const flattenArray2 = flatMapDeep(arr, 1, (item) => ({ id: item }));
// const flattenArray2: (number[] | { id: number })[];

const flattenArray3 = flatMapDeep(arr, 2, (item) => ({ id: item }));
// const flattenArray3: { id: number }[];

const flattenArray4 = flatMapDeep(arr, Infinity, (item) => ({ id: item }));
// const flattenArray4: { id: number }[];
```

## Code

[🔗 실제 구현 코드 확인](https://github.com/modern-agile-team/modern-kit/blob/main/packages/utils/src/array/flatMapDeep/index.ts)

## Interface
```ts title="typescript"
// flat함수의 반환 타입인 FlatArray를 기반으로 정의
type FlatArrayWithIteratee<Arr, Depth extends number, U> = {
  done: Arr extends ReadonlyArray<any> ? Arr : never;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArrayWithIteratee<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth], U>
    : U;
}[Depth extends -1 ? 'done' : 'recur'];
```
```ts title="typescript"
/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]])
 */
export function flatMapDeep<T>(arr: T[] | readonly T[]): FlatArray<T[], 1>[];

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]], 2)
 */
export function flatMapDeep<T, D extends number>(
  arr: T[] | readonly T[],
  depth: D
): FlatArray<T[], D>[];

/**
 * @example
 * flatMapDeep([1, 2, [3, 4, [5, 6]]], 0, (item) => item * 2): FlatArray<T[], D>[]
 * flatMapDeep([1, 2, [3, 4, [5, 6]]], 1, (item) => item * 2): FlatArrayWithIteratee<T[], D, U>[]
 */
export function flatMapDeep<T, D extends number, U>(
  arr: T[] | readonly T[],
  depth: D,
  iteratee: (item: ExtractNestedArrayType<T[]>) => U
): NaturalNumber<D> extends never
  ? FlatArray<T[], D>[]
  : FlatArrayWithIteratee<T[], D, U>[];
```

## Usage

```ts title="typescript"
import { flatMapDeep } from '@modern-kit/utils';

flatMapDeep([1, 2, [3, 4, [5, 6]]]); // [1, 2, 3, 4, [5, 6]]
flatMapDeep([1, 2, [3, 4, [5, 6]]], 1); // [1, 2, 3, 4, [5, 6]]

flatMapDeep([1, 2, [3, 4, [5, 6]]], 2); // [1, 2, 3, 4, 5, 6]
flatMapDeep([1, 2, [3, 4, [5, 6]]], 2, (item) => ({ id: item }));
// [{ id: 1}, { id: 2}, { id: 3}, { id: 4}, { id: 5}, { id: 6}];
```
