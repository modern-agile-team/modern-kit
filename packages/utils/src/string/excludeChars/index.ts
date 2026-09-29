import { extractChars } from '../extractChars';

interface ExcludeCharsOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

/**
 * @description 주어진 문자열에서 특정 옵션에 따라 문자를 제외하는 함수입니다.
 *
 * 지정한 유형을 남기는 {@link extractChars} 와 정반대로, 지정한 유형을 걷어냅니다.
 *
 * @param {string} value - 처리할 입력 문자열입니다.
 * @param {ExcludeCharsOptions} [options] - 제외할 문자의 유형을 지정하는 옵션 객체입니다. 기본값은 `letters: true`로, 기본적으로 문자만 제외합니다.
 * - `letters` (boolean): 문자열에서 문자를 제외할지 여부를 지정합니다. 결합 문자(악센트 등)도 함께 제외됩니다.
 * - `numbers` (boolean): 문자열에서 숫자를 제외할지 여부를 지정합니다.
 * - `specialCharacters` (boolean): 문자열에서 특수 문자를 제외할지 여부를 지정합니다.
 * - `whiteSpace` (boolean): 문자열에서 공백을 제외할지 여부를 지정합니다.
 *
 * @returns {string} - 주어진 옵션에 따라 필터링된 문자를 포함하는 문자열을 반환합니다.
 *
 * @example
 * // 문자를 제외
 * excludeChars('abc123!@#', { letters: true }); // '123!@#'
 *
 * @example
 * // 숫자를 제외
 * excludeChars('abc123!@#', { numbers: true }); // 'abc!@#'
 *
 * @example
 * // 문자와 숫자를 제외
 * excludeChars('abc123!@#', { letters: true, numbers: true }); // '!@#'
 *
 * @example
 * // 공백과 숫자를 제외
 * excludeChars('abc  123 !@#', { whiteSpace: true, numbers: true }); // 'abc!@#'
 *
 * @example
 * // extractChars 와 정반대 동작입니다
 * extractChars('abc123', { numbers: true }); // '123'
 * excludeChars('abc123', { numbers: true }); // 'abc'
 */
export function excludeChars(
  value: string,
  options: ExcludeCharsOptions = { letters: true }
): string {
  const optionsToUse = {
    letters: !options.letters,
    numbers: !options.numbers,
    specialCharacters: !options.specialCharacters,
    whiteSpace: !options.whiteSpace,
  };

  return extractChars(value, optionsToUse);
}
