/**
 * @description 주어진 문자열에 공백 문자가 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 공백 문자가 포함되어 있는지 여부
 *
 * @example
 * containsWhiteSpace('Hello World'); // true
 * containsWhiteSpace('Hello\nWorld'); // true, 줄바꿈 문자
 * containsWhiteSpace('Hello\tWorld'); // true, 탭 문자
 *
 * @example
 * containsWhiteSpace('HelloWorld'); // false
 */
export function containsWhiteSpace(value: string): boolean {
  return /\s/.test(value);
}
