import { isNil } from '../../validator/isNil';

function getRangeValues(
  start: number,
  end: number,
  step: number = 1
): number[] {
  const isAscending = end >= start;
  const directedStep = isAscending ? step : -step;
  const length = Math.max(Math.ceil((end - start) / directedStep), 0);
  const result = new Array(length);

  for (let i = 0; i < result.length; i++) {
    result[i] = start + directedStep * i;
  }

  return result;
}

/**
 * @description 0부터 종료 값(end)까지의 1씩 증가하는 숫자 배열을 생성합니다.
 *
 * @param {number} end - 생성할 숫자 범위의 종료 값입니다.
 * @returns {number[]} 0부터 종료 값까지 1씩 증가하는 숫자의 배열을 반환합니다.
 *
 * @example
 * range(5); // [0, 1, 2, 3, 4]
 */
export function range(end: number): number[];

/**
 * @description 시작 값(start)에서 종료 값(end)까지의 1씩 증가하는 숫자 배열을 생성합니다.
 *
 * @param {number} start - 생성할 숫자 범위의 시작 값입니다.
 * @param {number} end - 생성할 숫자 범위의 종료 값입니다.
 * @returns {number[]} 시작 값에서 종료 값까지 1씩 증가하는 숫자의 배열을 반환합니다.
 *
 * @example
 * range(1, 5); // [1, 2, 3, 4]
 */
export function range(start: number, end: number): number[];

/**
 * @description 시작 값(start)에서 종료 값(end)까지 주어진 간격(step)에 따라 숫자의 배열을 생성합니다.
 *
 * @param {number} start - 생성할 숫자 범위의 시작 값입니다.
 * @param {number} end - 생성할 숫자 범위의 종료 값입니다.
 * @param {number} step - 숫자의 증가 간격입니다.
 * @returns {number[]} 시작 값에서 종료 값까지 간격에 따라 생성된 숫자의 배열을 반환합니다.
 *
 * @throws {Error} `step`이 1 이상의 정수가 아닐 경우 에러를 발생시킵니다.
 *
 * @example
 * range(1, 10, 2); // [1, 3, 5, 7, 9]
 */
export function range(start: number, end: number, step: number): number[];

/**
 * @description 시작 값(start)에서 종료 값(end)까지 주어진 간격(step)에 따라 숫자의 배열을 생성합니다.
 *
 * @param {number} start - 생성할 숫자 범위의 시작 값입니다.
 * @param {number} end - 생성할 숫자 범위의 종료 값입니다.
 * @param {number} step - 숫자의 증가 간격입니다.
 * @returns {number[]} 시작 값에서 종료 값까지 간격에 따라 생성된 숫자의 배열을 반환합니다.
 *
 * @throws {Error} `step`이 1 이상의 정수가 아닐 경우 에러를 발생시킵니다.
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
export function range(start: number, end?: number, step: number = 1): number[] {
  if (isNil(end)) {
    return getRangeValues(0, start);
  }

  if (!Number.isInteger(step) || step < 1) {
    throw new Error('step은 1 이상의 정수여야 합니다.');
  }

  return getRangeValues(start, end, step);
}
