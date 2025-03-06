import { isString } from '../../validator/isString';

interface Options {
  length?: number;
  omission?: string;
  separator?: RegExp | string;
}
/**
 * @description 주어진 문자열을 지정된 길이로 자르고, 필요에 따라 생략 표시(...)를 추가합니다.
 * 이 함수는 `separator` 옵션을 사용하여 특정 구분자로 문자열을 잘라낼 수도 있습니다.
 *
 * @param {string} string - 자르고자 하는 문자열입니다.
 * @param {Options} options - 문자열 잘라내기 옵션입니다.
 * @param {number} [options.length=30] - 자를 최대 길이입니다. 기본값은 30입니다.
 * @param {string} [options.omission='...'] - 잘린 문자열 뒤에 추가될 생략 기호입니다. 기본값은 '...'입니다.
 * @param {RegExp|string} [options.separator] - 문자열을 자를 때 기준이 되는 구분자입니다. 기본값은 없으며, 구분자를 사용하면 마지막 일치 지점에서 자릅니다.
 * @returns {string} - 잘린 문자열을 반환합니다.
 *
 * @example
 * const str1 = truncate('hi-diddly-ho there, neighborino');
 * 'hi-diddly-ho there, neighbo...'
 *
 *
 * const str2 = truncate('hi-diddly-ho there, neighborino', {
 *   length: 24,
 *   separator: ' ',
 * });
 * 'hi-diddly-ho there,...'
 *
 * const str3 = truncate('hi-diddly-ho there, neighborino', {
 *   omission: ' [...]',
 *   length: 24,
 *   separator: /, +/,
 * });
 * 'hi-diddly-ho [...]'
 */
export function truncate(string: string, options: Options = {}): string {
  const { length = 30, omission = '...', separator } = options;

  if (string.length <= length) {
    return string;
  }

  const truncatedLength = length - omission.length;

  if (truncatedLength <= 0) {
    return omission;
  }

  let truncatedString = string.slice(0, truncatedLength);

  if (!separator) {
    return truncatedString + omission;
  }
  if (isString(separator)) {
    const matchIndex = truncatedString.lastIndexOf(separator);
    if (matchIndex !== -1) {
      truncatedString = truncatedString.slice(0, matchIndex);
    }
  }

  if (separator instanceof RegExp) {
    const match = truncatedString.match(separator);

    if (match) {
      truncatedString = truncatedString.slice(0, match.index);
    }
  }

  return truncatedString + omission;
}
