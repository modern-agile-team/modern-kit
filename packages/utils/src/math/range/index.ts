import { isNil } from '../../validator';

function getRangeValue(start: number, end: number, step: number = 1) {
  const length = Math.max(Math.ceil((end - start) / step), 0);
  const result = new Array(length);

  for (let i = 0; i < result.length; i++) {
    result[i] = start + step * i;
  }

  return result;
}

/**
 * @description 시작 값(start)에서 종료 값(end)까지 주어진 간격(step)에 따라 숫자의 배열을 생성합니다.
 *
 * @param {number} start - 생성할 숫자 범위의 시작 값입니다.
 * @param {number} end - 생성할 숫자 범위의 종료 값입니다.
 * @param {number} [step] - 숫자의 증가 간격입니다.
 * @returns {number[]} 시작 값에서 종료 값까지 간격에 따라 생성된 숫자의 배열을 반환합니다.
 *
 * @throws {Error} `step`이 0이거나 정수가 아닌 경우 오류가 발생합니다.
 *
 * @example
 * range(5); // [0, 1, 2, 3, 4]
 *
 * @example
 * range(1, 5); // [1, 2, 3, 4]
 *
 * @example
 * range(1, 10, 2); // [1, 3, 5, 7, 9]
 */
export function range(end: number): number[];
export function range(start: number, end: number): number[];
export function range(start: number, end: number, step?: number): number[];
export function range(start: number, end?: number, step: number = 1) {
  if (isNil(end)) {
    return getRangeValue(0, start);
  }

  if (!Number.isInteger(step) || step === 0) {
    throw new Error('step은 0이 아닌 정수여야 합니다.');
  }

  return getRangeValue(start, end, step);
}
