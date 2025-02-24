import { flatMap } from '../../array/flatMap';
import { isNil } from '../../validator/isNil';

/**
 * @description
 * 문자열에서 `선행 공백` 또는 `지정된 문자`를 제거합니다.
 *
 * chars 매개변수가 주어지지 않으면 모든 선행 공백을 제거합니다. (String.prototype.trimStart와 동일하게 동작합니다.)
 *
 * chars 매개변수가 주어지면 해당 문자 또는 문자들의 조합을 문자열 시작 부분에서 찾아 제거합니다.
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 앞부분에서 제거하고싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str에서 선행 공백 또는 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trimStart('  abc'); // 'abc', 선행 공백 모두 제거
 * trimStart('--abc', '-'); // 'abc', '-'를 모두 제거
 * trimStart('+-*abc', '+-*'); // 'abc', 문자열의 각 문자인 '+', '-', '*'를 모두 제거
 *
 * @example
 * trimStart('--abc', '+'); // '--abc', '+'가 문자열에 없으므로 원본 문자열을 그대로 반환
 *
 * @example
 * trimStart('-_-abc-_-', ['-', '_']); // 'abc-_-', 선행에서 배열 요소인 '-'와 '_'를 모두 제거
 * trimStart('+-*abc-_-', ['+*', '-']); // 'abc-_-', 각 문자열 요소는 개별 문자로 나누고 제거 즉, '+', '*', '-'를 모두 제거
 */
export function trimStart(str: string, chars?: string | string[]): string {
  if (isNil(chars)) {
    return str.trimStart();
  }

  const charsToUse = Array.isArray(chars)
    ? flatMap(chars, (char) => char.split(''))
    : chars;

  let startIndex = 0;

  while (startIndex < str.length && charsToUse.includes(str[startIndex])) {
    startIndex++;
  }

  return str.substring(startIndex);
}
