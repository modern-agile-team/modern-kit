import { isNil } from '../../validator/isNil';

/**
 * @description
 * 문자열에서 `후행 공백` 또는 `지정된 문자`를 제거합니다.
 *
 * chars 매개변수가 주어지지 않으면 모든 공백 문자를 제거합니다. (String.prototype.trimEnd와 동일하게 동작합니다.)
 *
 * chars 매개변수가 주어지면 해당 문자 또는 문자들의 조합을 문자열 끝 부분에서 찾아 제거합니다.
 *
 * @param {string} str - 전체 문자열입니다.
 * @param {string | string[]} chars - 문자열 뒷부분에서 제거하고 싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str에서 뒤에있는 공백 또는 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trimEnd('  abc  '); // '  abc'
 * trimEnd('  abc--', '-'); // '  abc'
 * trimEnd('-_-abc-_-', ['-', '_', '-']); // '-_-abc'
 *
 * @example
 * trimEnd('--abc  ', '+'); // '--abc  '
 */
export function trimEnd(str: string, chars?: string | string[]): string {
  if (isNil(chars)) {
    return str.trimEnd();
  }

  const charsToRemove = Array.isArray(chars) ? chars.join('') : chars;
  let endIndex = str.length;

  while (str.endsWith(charsToRemove, endIndex)) {
    endIndex -= charsToRemove.length;
  }

  return str.slice(0, endIndex);
}
