/**
 * @description 주어진 문자열에 한글 음절이 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} string - 확인할 문자열
 * @returns {boolean} 한글 음절이 포함되어 있는지 여부
 *
 * @example
 * containsHangulSyllables('안녕하세요'); // true
 *
 * @example
 * containsHangulSyllables('hello'); // false
 * containsHangulSyllables('ㅏㅗ'); // false, 자음과 모음만 있는 경우
 */
export function containsHangulSyllables(string: string): boolean {
  return /[가-힣]/.test(string);
}
