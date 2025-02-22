import { isNil } from '../../validator/isNil';

/**
 * @description
 * 문자열에서 선행 공백 또는 지정된 문자를 제거합니다.
 *
 * @param {string} str - 전체문자열입니다.
 * @param {string | string[]} chars - 문자열 앞부분에서 제거하고싶은 문자열 혹은 문자열 배열입니다.
 * @returns {string} - str의 앞부분에서 지정된 chars를 제거한 문자열입니다.
 *
 * @example
 * trimStart('  abc  '); // 'abc  '
 * trimStart('--abc  ', '-'); // 'abc  '
 * trimStart('--abc  ', '+'); // '--abc  '
 * trimStart('-_-abc-_-', ['-', '_', '-']); // 'abc-_-'
 */
export function trimStart(str: string, chars?: string | string[]): string {
  if (isNil(chars)) {
    return str.trimStart();
  }

  const charsToUse = Array.isArray(chars) ? chars.join('') : chars;
  let startIndex = 0;

  while (str.startsWith(charsToUse, startIndex)) {
    startIndex += charsToUse.length;
  }

  return str.slice(startIndex);
}
