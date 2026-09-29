import { isNil } from '../isNil';
import { isString } from '../isString';
import { isPlainObject } from '../isPlainObject';

/**
 * @description 주어진 값이 비어있는지 확인합니다.
 *
 * 아래의 경우를 비어있는 값으로 판단합니다.
 * - `null`, `undefined`
 * - 빈 문자열 `''`
 * - 길이가 0인 배열
 * - `size`가 0인 `Map`, `Set`
 * - 자신의 열거 가능한 string key 가 없는 순수 객체
 *
 * 그 외의 값(숫자, boolean, 함수, `Date` 등)은 비어있지 않은 것으로 판단하여 `false`를 반환합니다.
 * lodash 와 달리 `0`, `false` 등은 비어있는 값으로 취급하지 않습니다.
 *
 * @param {unknown} value - 비어있는지 확인할 값
 * @returns {boolean} - 값이 비어있으면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isEmpty(null); // true
 * isEmpty(''); // true
 * isEmpty([]); // true
 * isEmpty({}); // true
 * isEmpty(new Map()); // true
 *
 * @example
 * isEmpty(' '); // false
 * isEmpty([0]); // false
 * isEmpty({ a: undefined }); // false
 * isEmpty(0); // false
 * isEmpty(false); // false
 */
export function isEmpty(value: unknown): boolean {
  if (isNil(value)) {
    return true;
  }

  if (isString(value) || Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Map || value instanceof Set) {
    return value.size === 0;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }

  return false;
}
