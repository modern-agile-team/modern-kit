import { objectKeys } from '../../object/objectKeys';

interface ExtractLettersOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

const CHAR_PATTERNS = {
  letters: '\\p{L}', // 모든 문자
  numbers: '\\p{N}', // 모든 숫자
  specialCharacters: '\\p{S}\\p{P}', // 모든 특수 문자
  whiteSpace: '\\s', // 모든 공백 문자
} as const;

/**
 * @description 문자열에서 특정 문자를 필터링하는 정규 표현식을 생성합니다.
 */
const getRegexByOptions = (options: ExtractLettersOptions): RegExp => {
  const keys = objectKeys(options);
  let pattern = '';

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    if (options[key]) {
      pattern += CHAR_PATTERNS[key];
    }
  }

  return new RegExp(`[^${pattern}]`, 'gu');
};

/**
 * @description 주어진 문자열에서 특정 옵션에 따라 문자를 추출하는 함수입니다.
 *
 * @param {string} value - 처리할 입력 문자열입니다.
 * @param {ExtractLettersOptions} [options] - 추출할 문자의 유형을 지정하는 옵션 객체입니다. 기본적으로 문자만 추출합니다.
 * - `letters` (boolean): 문자열에서 문자를 추출할지 여부를 지정합니다.
 * - `numbers` (boolean): 문자열에서 숫자를 추출할지 여부를 지정합니다.
 * - `specialCharacters` (boolean): 문자열에서 특수 문자를 추출할지 여부를 지정합니다.
 * - `whiteSpace` (boolean): 문자열에서 공백을 추출할지 여부를 지정합니다.
 *
 * @returns {string} - 주어진 옵션에 따라 필터링된 문자를 포함하는 문자열을 반환합니다.
 *
 * @example
 * // 문자를 추출
 * extractLetters('abc123!@#', { letters: true }); // 'abc'
 *
 * @example
 * // 숫자를 추출
 * extractLetters('abc123!@#', { numbers: true }); // '123'
 *
 * @example
 * // 문자와 숫자를 추출
 * extractLetters('abc123!@#', { letters: true, numbers: true }); // 'abc123'
 *
 * @example
 * // 공백과 숫자를 추출
 * extractLetters('abc  123 !@#', { whiteSpace: true, numbers: true }); // '  123 '
 */
export function extractLetters(
  value: string,
  options: ExtractLettersOptions = { letters: true }
): string {
  const regex = getRegexByOptions(options);
  return value.replace(regex, '');
}
