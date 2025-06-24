type _EnumerateNumbers<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : _EnumerateNumbers<N, [...Acc, Acc['length']]>;

/**
 * @description 0부터 N-1까지의 숫자 유니언 타입을 생성합니다. N이 number타입이 아닐경우 never를 반환합니다.
 *
 * @template N - 생성할 숫자 범위의 상한값
 *
 * @example
 * type zeroToFive = EnumerateNumbers<6>; // 0 | 1 | 2 | 3 | 4 | 5
 *
 * @example
 * type otherTypeEnumerate = EnumerateNumbers<'6'>; // never
 */
export type EnumerateNumbers<N> = N extends number
  ? _EnumerateNumbers<N>
  : never;
