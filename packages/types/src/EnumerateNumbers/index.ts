/**
 * @description 0부터 N-1까지의 숫자 유니언 타입을 생성합니다. N이 number타입이 아닐경우 never를 반환합니다.
 *
 * @template N - 생성할 숫자 범위의 상한값
 * @template Acc - 재귀적으로 숫자를 누적하는 배열 타입입니다. 배열의 길이를 기반으로 시작 인덱스를 지정할 수 있습니다.
 * - 예를 들어, [0, 0]이면 길이가 2이므로 2부터 시작하는 유니언 타입이 생성됩니다. 내부 값은 크게 영향을 주지 않습니다.
 * - 기본값은 빈 배열입니다.
 *
 * @example
 * type zeroToFive = EnumerateNumbers<6>; // 0 | 1 | 2 | 3 | 4 | 5
 * type twoToFive = EnumerateNumbers<6, [0, 0]>; // 2 | 3 | 4 | 5 (Acc 배열 길이가 2이므로 2부터 시작)
 *
 * @example
 * type otherTypeEnumerate = EnumerateNumbers<'6'>; // never
 */
export type EnumerateNumbers<
  N extends number,
  Acc extends number[] = []
> = N extends number
  ? Acc['length'] extends N
    ? Acc extends []
      ? Acc[number]
      : Exclude<Acc[number], 0>
    : EnumerateNumbers<N, [...Acc, Acc['length']]>
  : never;
