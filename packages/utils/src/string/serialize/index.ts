import { type SerializeOptions, serializeByType } from './internal';

/**
 * @description 인자로 들어온 객체를 직렬화합니다.
 *
 * 기본적으로 null, empty string, undefined에 대해서는 제외하나 두번째 인자로 옵션을 넣어 이를 포함시킬 수 있습니다.
 *
 * @template T - 직렬화 할 객체의 유형입니다.
 * @param {T} obj - 직렬화할 객체입니다.
 * @param {SerializeOptions} options - 직렬화 옵션입니다.
 * @returns {string} - 직렬화된 문자열을 반환합니다.
 *
 * @example
 * const value = { str: 'foo', num: 1, a: null, b: '', c: undefined }
 * const option = { skipNull: false, skipEmptyString: false, skipUndefined: false }
 *
 * serialize(value)
 * // 'str=foo&num=1'
 *
 * serialize(value, option)
 * // 'str=foo&num=1&a=null&b=&c=undefined'
 */

export function serialize<T extends Record<PropertyKey, any>>(
  obj: T,
  options: SerializeOptions = {}
): string {
  const keys = Object.keys(obj);
  let result = '';

  for (const key of keys) {
    const target = obj[key];
    const serializedValue = serializeByType(key, target, options);

    if (serializedValue) {
      result += result ? `&${serializedValue}` : serializedValue;
    }
  }

  return result;
}
