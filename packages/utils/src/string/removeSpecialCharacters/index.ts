import { removeLetters } from '../removeLetters';

/**
 * @description 주어진 문자열에서 특수 문자를 제거하는 함수입니다.
 *
 * @param {string} value - 처리할 입력 문자열입니다.
 * @returns {string} 특수 문자가 제거된 문자열을 반환합니다.
 *
 * @example
 * removeSpecialCharacters('H@#!ello, @Wo!@#!!(%)(!&@rld!'); // 'Hello world'
 */
export function removeSpecialCharacters(value: string): string {
  return removeLetters(value, {
    specialCharacters: true,
  });
}
