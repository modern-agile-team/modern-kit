/**
 * @description 숫자 범위를 생성하는 타입입니다.
 *
 * @template T - 시작 숫자
 * @template F - 끝 숫자
 * @returns T부터 F까지의 숫자 범위를 생성해 타입으로 반환합니다. 입력 타입인 <number, number>이 아닐 경우 never를 반환합니다.
 *
 * @example
 * type RangeExample = Range<1, 5>; // 1 | 2 | 3 | 4
 *
 */
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F, T> = F extends number
  ? T extends number
    ? Exclude<Enumerate<T>, Enumerate<F>>
    : never
  : never;
