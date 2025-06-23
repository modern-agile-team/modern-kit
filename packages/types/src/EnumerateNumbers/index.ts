/**
 * @description 0부터 N-1까지의 숫자 유니언 타입을 생성합니다. N이 number타입이 아닐경우 never를 반환합니다.
 *
 * @template N - 생성할 숫자 범위의 상한값 (5면 0, 1, 2, 3, 4를 생성)
 * @template Acc - 재귀적으로 누적되는 배열 타입, 기본값은 빈 배열입니다.
 *
 * @example
 * type zeroToFive = EnumerateNumbers<6>; // 0 | 1 | 2 | 3 | 4 | 5
 * type otherTypeEnumerate = EnumerateNumbers<'6'>; // never
 */
export type EnumerateNumbers<N, Acc extends number[] = []> = N extends number
  ? Acc['length'] extends N
    ? Acc[number]
    : EnumerateNumbers<N, [...Acc, Acc['length']]>
  : never;
