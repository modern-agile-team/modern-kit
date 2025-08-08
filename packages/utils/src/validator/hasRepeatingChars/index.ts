/**
 * @description 주어진 문자열에서 연속된 문자의 개수가 maxCount를 초과하는지 확인하는 함수입니다.
 *
 * @param {string} string - 확인할 문자열
 * @param {number} maxCount - 연속된 문자의 최대 개수
 * @returns {boolean} 연속된 문자의 개수가 maxCount를 초과하는지 여부
 *
 * @example
 * containsConsecutiveCharacters('aaabbb', 3); // true
 * containsConsecutiveCharacters('aaabbb', 2); // false
 */
export function hasRepeatingChars(string: string, maxCount: number): boolean {
  if (!Number.isInteger(maxCount) || maxCount < 1) {
    throw new Error('maxCount는 양의 정수여야 합니다');
  }

  const regex = new RegExp(`(.)\\1{${maxCount - 1}}`);
  return regex.test(string);
}
