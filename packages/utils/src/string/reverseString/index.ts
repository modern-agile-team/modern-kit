/**
 * @description 주어진 문자열을 뒤집어 반환하는 함수입니다.
 *
 * spread 연산자를 사용하여 유니코드 문자열을 지원합니다.
 * @see https://github.com/modern-agile-team/modern-kit/issues/272
 *
 * @param {string} value - 뒤집을 문자열입니다.
 * @returns {string} 뒤집힌 문자열입니다. 입력이 없거나 빈 문자열인 경우, 빈 문자열을 반환합니다.
 *
 * @example
 * reverseString("hello"); // "olleh"
 */
export function reverseString(value: string): string {
  return [...value].reverse().join('');
}
