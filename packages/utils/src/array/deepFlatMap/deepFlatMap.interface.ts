/**
 * @description FlatArray 타입을 바탕으로 제네릭 U 타입을 적용하기 위한 유틸리티 타입
 *
 * @example
 * type Example = FlatArrayWithIteratee<(number | (number | number[])[])[], 1, string>;
 * // Example: string | number[]
 */
export type FlatArrayWithIteratee<Arr, Depth extends number, U> = {
  done: Arr extends ReadonlyArray<any> ? Arr : never;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArrayWithIteratee<
        InnerArr,
        [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ][Depth],
        U
      >
    : U;
}[Depth extends -1 ? 'done' : 'recur'];
