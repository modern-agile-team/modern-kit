import { extractLetters } from '../extractLetters';

/**
 * @description 문자열에서 숫자만 추출하는 함수입니다.
 *
 * 이 함수는 입력된 문자열에서 숫자가 아닌 모든 문자를 제거하고, 숫자만 남은 문자열을 반환합니다.
 *
 * @param {string} value - 숫자를 추출할 대상 문자열.
 *
 * @returns {string} 숫자만 남은 문자열.
 *
 * @example
 * extractNumber("abc1 23def 456"); // "123456"
 * extractNumber("전화번호: 010-1234-5678"); // "01012345678"
 */
export function extractNumber(value: string): string {
  return extractLetters(value, { numbers: true });
}
