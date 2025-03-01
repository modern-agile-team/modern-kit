import { flatMap } from '../../array/flatMap';
import { isNil } from '../../validator/isNil';

/**
 * @description 문자열에서 `후행 공백`을 제거합니다. `String.prototype.trimEnd`와 동일하게 동작합니다.
 *
 * @param {string} str - 전체 문자열입니다.
 * @returns {string} - str에서 `후행 공백`을 제거한 문자열입니다.
 *
 * @example
 * trimEnd('abc  '); // 'abc'
 */
export function trimEnd(str: string): string;

/**
 * @description 문자열에서 `지정된 문자들의 조합`을 문자열 끝 부분에서 찾아 제거합니다.
 *
 * chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `"+-*" -> ['+', '-', '*']`
 *
 * chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `['+*', '-'] -> ['+', '*', '-']`
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 뒷부분에서 제거하고 싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str에서 뒤에있는 공백 또는 지정된 chars를 제거한 문자열입니다.
 *
 *
 * @example
 * trimEnd('abc--', '-'); // 'abc'
 * trimEnd('abc+-*', '+-*'); // 'abc'
 *
 * @example
 * trimEnd('abc-_-', ['-', '_']); // 'abc'
 * trimEnd('abc+-*', ['+*', '-']); // 'abc'
 */
export function trimEnd(str: string, chars: string | string[]): string;

/**
 * @description 문자열에서 `후행 공백` 또는 `지정된 문자`를 제거합니다.
 *
 * chars 매개변수가 주어지지 않으면 모든 후행 공백을 제거합니다. (`String.prototype.trimEnd`와 동일하게 동작합니다.)
 *
 * chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 시작 부분에서 이를 찾아 제거합니다.
 * - ex: `'+-*' -> ['+', '-', '*']`
 *
 * chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 시작 부분에서 이를 찾아 제거합니다.
 * - ex: `['+*', '-'] -> ['+', '*', '-']`
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 뒷부분에서 제거하고 싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str에서 뒤에있는 공백 또는 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trimEnd('abc  '); // 'abc', 후행 공백 모두 제거
 *
 * @example
 * trimEnd('abc--', '-'); // 'abc'
 * trimEnd('abc+-*', '+-*'); // 'abc'
 *
 * @example
 * trimEnd('abc-_-', ['-', '_']); // 'abc'
 * trimEnd('abc+-*', ['+*', '-']); // 'abc'
 */
export function trimEnd(str: string, chars?: string | string[]): string {
  if (isNil(chars)) {
    return str.trimEnd();
  }

  const charsToUse = Array.isArray(chars)
    ? flatMap(chars, (char) => char.split(''))
    : chars;

  let endIndex = str.length;

  while (endIndex > 0 && charsToUse.includes(str[endIndex - 1])) {
    endIndex--;
  }

  return str.substring(0, endIndex);
}
