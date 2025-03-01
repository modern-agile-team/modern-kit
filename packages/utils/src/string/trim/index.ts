import { isNil } from '../../validator/isNil';
import { trimEnd } from '../trimEnd';
import { trimStart } from '../trimStart';

/**
 * @description 문자열에서 `선행 공백`과 `후행 공백`을 제거합니다. `String.prototype.trim`과 동일하게 동작합니다.
 *
 * @param {string} str - 전체 문자열입니다.
 * @returns {string} - str에서 `선행 공백`과 `후행 공백`을 제거한 문자열입니다.
 *
 * @example
 * trim('  abc  '); // 'abc'
 */
export function trim(str: string): string;

/**
 * @description 문자열에서 `지정된 문자들의 조합`을 문자열 시작과 끝 부분에서 찾아 제거합니다.
 *
 * chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `"+-*" -> ['+', '-', '*']`
 *
 * chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `['+*', '-'] -> ['+', '*', '-']`
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 시작과 끝에서 제거하고 싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str의 시작과 끝에서 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trim('-_-abc-_-', ['-', '_']); // 'abc'
 * trim('+-*abc+-*', ['+*', '-']); // 'abc'
 */
export function trim(str: string, chars: string | string[]): string;

/**
 * @description 문자열의 시작과 끝에서 `공백` 또는 `지정된 문자`를 제거합니다.
 *
 * chars 매개변수가 주어지지 않으면 모든 선행과 후행 공백을 제거합니다. (`String.prototype.trim`과 동일하게 동작합니다.)
 *
 * chars가 문자열인 경우 해당 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `"+-*" -> ['+', '-', '*']`
 *
 * chars가 배열인 경우 배열 내 문자열을 각 문자로 나누고 문자열 끝 부분에서 이를 찾아 제거합니다.
 * - ex: `['+*', '-'] -> ['+', '*', '-']`
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 시작과 끝에서 제거하고 싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str의 시작과 끝에서 공백 또는 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trim('  abc  '); // 'abc', 선행과 후행 공백 모두 제거
 *
 * @example
 * trim('--abc--', '-'); // 'abc'
 * trim('+-*abc+-*', '+-*'); // 'abc'
 *
 * @example
 * trim('-_-abc-_-', ['-', '_']); // 'abc'
 * trim('+-*abc+-*', ['+*', '-']); // 'abc'
 */
export function trim(str: string, chars?: string | string[]): string {
  if (isNil(chars)) {
    return str.trim();
  }

  return trimStart(trimEnd(str, chars as string[]), chars as string[]);
}
