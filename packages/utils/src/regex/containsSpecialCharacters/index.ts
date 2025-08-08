/**
 * @description 주어진 문자열에 특수문자가 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 특수문자가 포함되어 있는지 여부
 *
 * @example
 * containsSpecialCharacters('Hello!'); // true
 * containsSpecialCharacters('!@#$%'); // true
 *
 * @example
 * containsSpecialCharacters('hello'); // false
 * containsSpecialCharacters('12345'); // false
 */
export function containsSpecialCharacters(value: string): boolean {
  const regex = /[~!@#$%^&*_\-+=\\|(){}[\]:;"'`<>,.?/]/;
  return regex.test(value);
}
