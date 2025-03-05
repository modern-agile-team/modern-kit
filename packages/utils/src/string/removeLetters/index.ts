import { extractLetters } from '../extractLetters';

interface RemoveCharactersOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

/**
 * @description 주어진 문자열에서 특정 옵션에 따라 문자를 제거하는 함수입니다.
 *
 * @param {string} value - 처리할 입력 문자열입니다.
 * @param {RemoveCharactersOptions} [options] - 제거할 문자의 유형을 지정하는 옵션 객체입니다. 기본적으로 문자만 제거합니다.
 * - `letters` (boolean): 문자열에서 문자를 제거할지 여부를 지정합니다.
 * - `numbers` (boolean): 문자열에서 숫자를 제거할지 여부를 지정합니다.
 * - `specialCharacters` (boolean): 문자열에서 특수 문자를 제거할지 여부를 지정합니다.
 * - `whiteSpace` (boolean): 문자열에서 공백을 제거할지 여부를 지정합니다.
 *
 * @returns {string} - 주어진 옵션에 따라 필터링된 문자를 포함하는 문자열을 반환합니다.
 *
 * @example
 * // 문자를 제거
 * removeLetters('abc123!@#', { letters: true }); // '123!@#'
 *
 * @example
 * // 숫자를 제거
 * removeLetters('abc123!@#', { numbers: true }); // 'abc!@#'
 *
 * @example
 * // 문자와 숫자를 제거
 * removeLetters('abc123!@#', { letters: true, numbers: true }); // '!@#'
 *
 * @example
 * // 공백과 숫자를 제거
 * removeLetters('abc  123 !@#', { whiteSpace: true, numbers: true }); // 'abc!@#'
 */
export function removeLetters(
  value: string,
  options: RemoveCharactersOptions = { letters: true }
): string {
  const optionsToUse = {
    letters: !options.letters,
    numbers: !options.numbers,
    specialCharacters: !options.specialCharacters,
    whiteSpace: !options.whiteSpace,
  };

  return extractLetters(value, optionsToUse);
}
