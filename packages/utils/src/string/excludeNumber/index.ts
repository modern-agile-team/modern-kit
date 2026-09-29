import { excludeChars } from '../excludeChars';

/**
 * @description 문자열에서 숫자만 제외하는 함수입니다.
 *
 * 이 함수는 입력된 문자열에서 숫자를 모두 제거하고, 나머지 문자를 그대로 반환합니다.
 * 숫자만 남기는 {@link extractNumber} 와 정반대로 동작합니다.
 *
 * @param {string} value - 숫자를 제외할 대상 문자열.
 *
 * @returns {string} 숫자가 제거된 문자열.
 *
 * @example
 * excludeNumber('Hello123 World456'); // 'Hello World'
 * excludeNumber('전화번호: 010-1234-5678'); // '전화번호: --'
 */
export function excludeNumber(value: string): string {
  return excludeChars(value, { numbers: true });
}
