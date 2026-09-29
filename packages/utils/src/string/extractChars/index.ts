import { objectKeys } from '../../object/objectKeys';

interface ExtractCharsOptions {
  letters?: boolean;
  numbers?: boolean;
  specialCharacters?: boolean;
  whiteSpace?: boolean;
}

const CHAR_PATTERNS = {
  letters: '\\p{L}\\p{M}', // 모든 문자 + 결합 문자('José' -> 'Jose')
  numbers: '\\p{N}', // 모든 숫자
  specialCharacters: '\\p{S}\\p{P}\\u200D\\uFE0F', // 모든 특수 문자 + 이모지 결합 문자
  whiteSpace: '\\s', // 모든 공백 문자
} as const;

/**
 * @description 문자열에서 특정 문자를 필터링하는 정규 표현식을 생성합니다.
 */
const getRegexByOptions = (options: ExtractCharsOptions): RegExp => {
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
 * @param {ExtractCharsOptions} [options] - 추출할 문자의 유형을 지정하는 옵션 객체입니다. 기본값은 `letters: true`로, 기본적으로 문자만 추출합니다.
 * - `letters` (boolean): 문자열에서 문자를 추출할지 여부를 지정합니다. 결합 문자(악센트 등)도 함께 추출됩니다.
 * - `numbers` (boolean): 문자열에서 숫자를 추출할지 여부를 지정합니다.
 * - `specialCharacters` (boolean): 문자열에서 특수 문자를 추출할지 여부를 지정합니다. 이모지 시퀀스를 잇는 ZWJ/변형 선택자도 함께 추출됩니다.
 * - `whiteSpace` (boolean): 문자열에서 공백을 추출할지 여부를 지정합니다.
 *
 * @returns {string} - 주어진 옵션에 따라 필터링된 문자를 포함하는 문자열을 반환합니다.
 *
 * @example
 * // 문자를 추출
 * extractChars('abc123!@#', { letters: true }); // 'abc'
 *
 * @example
 * // 숫자를 추출
 * extractChars('abc123!@#', { numbers: true }); // '123'
 *
 * @example
 * // 문자와 숫자를 추출
 * extractChars('abc123!@#', { letters: true, numbers: true }); // 'abc123'
 *
 * @example
 * // 공백과 숫자를 추출
 * extractChars('abc  123 !@#', { whiteSpace: true, numbers: true }); // '  123 '
 *
 * @example
 * // 결합 문자는 문자와 함께 보존됩니다 (NFD 정규화된 문자열)
 * extractChars('José'.normalize('NFD'), { letters: true }); // 'José'
 *
 * @example
 * // 이모지 시퀀스는 분해되지 않습니다
 * extractChars('가족 👨‍👩‍👧', { specialCharacters: true }); // '👨‍👩‍👧'
 */
export function extractChars(
  value: string,
  options: ExtractCharsOptions = { letters: true }
): string {
  const regex = getRegexByOptions(options);
  return value.replace(regex, '');
}
