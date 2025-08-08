/**
 * @description 주어진 문자열에 한글 자음과 모음이 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} string - 확인할 문자열
 * @returns {boolean} 한글 자음과 모음이 포함되어 있는지 여부
 *
 * @example
 * containsHangulConsonantsAndVowel('안녕하세요'); // true
 *
 * @example
 * containsHangulConsonantsAndVowel('hello'); // false
 */
export function containsHangulConsonantsAndVowel(string: string): boolean {
  return /[ㄱ-ㅎ|ㅏ-ㅣ]/.test(string);
}
