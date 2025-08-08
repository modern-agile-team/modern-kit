import { containsHangulSyllables } from '../containsHangulSyllables';
import { containsHangulConsonantsAndVowel } from '../containsHangulConsonantsAndVowel';

/**
 * @description 주어진 문자열에 한글 문자가 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} string - 확인할 문자열
 * @returns {boolean} 한글 문자가 포함되어 있는지 여부
 *
 * @example
 * containsHangul('안녕하세요'); // true
 * containsHangul('ㅏㅗ'); // true
 *
 * @example
 * containsHangul('hello'); // false
 */
export function containsHangul(string: string): boolean {
  return (
    containsHangulConsonantsAndVowel(string) || containsHangulSyllables(string)
  );
}
