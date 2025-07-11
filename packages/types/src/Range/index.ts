import { EnumerateNumbers } from '../EnumerateNumbers';

/**
 * @description 주어진 두 숫자 사이의 범위를 생성하는 타입입니다. 이때, 마지막 숫자는 포함되지 않습니다.
 * - 예를 들어 1부터 5까지의 범위를 생성하면 1, 2, 3, 4가 포함됩니다.
 * - 두 숫자가 같은 경우 `never`를 반환합니다.
 * - 첫 번째 숫자가 두 번째 숫자보다 큰 경우 `never`를 반환합니다.
 *
 * @template T - 시작 숫자
 * @template F - 끝 숫자
 * @returns T부터 F까지의 숫자 범위를 생성해 타입으로 반환합니다. 입력 타입인 <number, number>이 아닐 경우 never를 반환합니다.
 *
 * @example
 * type RangeExample = Range<1, 5>; // 1 | 2 | 3 | 4
 */
export type Range<T, F> = T extends number
  ? F extends number
    ? Exclude<EnumerateNumbers<F>, EnumerateNumbers<T>>
    : never
  : never;
