import { isNil } from '../../validator/isNil';
import { isSeparatorAt, lastSeparatorIndex, takeGraphemes } from './internal';

const DEFAULT_LENGTH = 30;
const DEFAULT_OMISSION = '...';

interface TruncateOptions {
  length?: number;
  omission?: string;
  separator?: string | RegExp;
}

/**
 * @description 문자열이 지정한 길이를 넘으면 잘라내고, 잘린 자리에 생략 기호를 붙이는 함수입니다.
 *
 * `length` 는 `omission` 을 포함한 결과 문자열 전체의 길이이므로, 반환값은 `length` 를 넘지 않습니다. (단, `length` 가 `omission` 보다 짧으면 `omission` 만 반환합니다.)
 *
 * 길이는 코드 단위가 아닌 그래핌 클러스터(사용자가 한 글자로 인식하는 단위)로 셉니다.
 * 덕분에 이모지 시퀀스(`'👨‍👩‍👧'`)나 결합 문자가 중간에서 쪼개지지 않습니다.
 * 자세한 내용은 {@link takeGraphemes} 를 참고하세요.
 *
 * @param {string} str - 자를 문자열입니다.
 * @param {TruncateOptions} [options] - 자르는 기준을 지정하는 옵션 객체입니다.
 * - `length` (number): `omission` 을 포함한 결과 문자열의 최대 길이입니다. 기본값은 `30` 입니다.
 * - `omission` (string): 잘린 자리에 덧붙일 문자열입니다. 기본값은 `'...'` 입니다.
 * - `separator` (string | RegExp): 단어 중간이 끊기지 않도록, 잘리는 지점 앞의 마지막 구분자까지만 남깁니다.
 *
 * @returns {string} 잘린 문자열입니다. 원본이 `length` 이하이면 원본을 그대로 반환합니다.
 *
 * @example
 * truncate('hi-diddly-ho there, neighborino');
 * // 'hi-diddly-ho there, neighbo...' (기본 length: 30)
 *
 * @example
 * // length 는 omission 까지 포함한 길이입니다 (21 + 3 = 24)
 * truncate('hi-diddly-ho there, neighborino', { length: 24 });
 * // 'hi-diddly-ho there, n...'
 *
 * @example
 * // separator 를 주면 단어 중간에서 끊기지 않습니다
 * truncate('hi-diddly-ho there, neighborino', { length: 24, separator: ' ' });
 * // 'hi-diddly-ho there,...'
 *
 * @example
 * truncate('hi-diddly-ho there, neighborino', { length: 24, separator: /,? +/ });
 * // 'hi-diddly-ho there...'
 *
 * @example
 * truncate('hi-diddly-ho there, neighborino', { omission: ' [...]' });
 * // 'hi-diddly-ho there, neig [...]'
 *
 * @example
 * // 원본이 length 이하면 그대로 반환합니다
 * truncate('번개장터', { length: 10 }); // '번개장터'
 *
 * @example
 * // 이모지 시퀀스는 쪼개지지 않고 한 글자로 세어집니다
 * truncate('가족은 👨‍👩‍👧 입니다', { length: 8 }); // '가족은 👨‍👩‍👧...'
 */
export function truncate(str: string, options: TruncateOptions = {}): string {
  const {
    length = DEFAULT_LENGTH,
    omission = DEFAULT_OMISSION,
    separator,
  } = options;

  // 그래핌 개수는 코드 유닛 개수를 넘지 않으므로, 이 경우 세어 볼 필요도 없습니다
  if (str.length <= length) {
    return str;
  }

  // 원본이 length 를 넘는지는 length + 1 개까지만 세어 보면 알 수 있습니다
  const graphemes = takeGraphemes(str, length + 1);

  if (graphemes.length <= length) {
    return str;
  }

  // 본문에 쓸 수 있는 길이입니다. length 가 omission 보다 짧으면 0 이하가 됩니다
  const end = length - takeGraphemes(omission).length;

  if (end < 1) {
    return omission;
  }

  const truncated = graphemes.slice(0, end).join('');

  if (isNil(separator) || isSeparatorAt(str, truncated.length, separator)) {
    return truncated + omission;
  }

  // 구분자를 못 찾으면(-1) 되돌리지 않고 자른 자리를 그대로 씁니다
  const index = lastSeparatorIndex(truncated, separator);

  return (index === -1 ? truncated : truncated.slice(0, index)) + omission;
}
