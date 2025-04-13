import { isNil, isBoolean, isNumber } from '../../validator';
import { FALSY_CHECK_MAPPER } from './pickFalsy.utils';

type FalsyCheckKey = keyof typeof FALSY_CHECK_MAPPER;

/**
 * @description 선택한 타입에 대한 falsy 체크 함수를 반환합니다.
 *
 * `숫자 0`, `빈 문자열("")`, `빈 배열([])`, `빈 객체({})`를 falsy로 판단하고 싶지 않을 수 있습니다.
 * 이때, 타입 인자를 설정해서 판단하고자 하는 타입을 지정할 수 있습니다.
 *
 * - 'number'를 지정하면 `숫자 0`을 falsy로 판단하지 않습니다.
 * - 'string'을 지정하면 `빈 문자열("")`을 falsy로 판단하지 않습니다.
 * - 'array'를 지정하면 `빈 배열([])`을 falsy로 판단하지 않습니다.
 * - 'object'를 지정하면 `빈 객체({})`을 falsy로 판단하지 않습니다.
 *
 * 기본적으로 `false`, `null`, `undefined`, `NaN`에 대해서만 falsy 체크를 수행합니다.
 *
 * @param {FalsyCheckKey[]} falsyCheckList - falsy를 체크하고자 하는 타입을 받습니다.
 * @returns {(value: unknown) => boolean} - 선택한 타입에 대한 falsy함수를 반환합니다.
 *
 * @example
 * const isInvalidValue = pickFalsy();
 *
 * isInvalidValue(null) // true
 * isInvalidValue(undefined) // true
 * isInvalidValue(false) // true
 * isInvalidValue(NaN) // true
 *
 * isInvalidValue(0) // false
 * isInvalidValue(-0) // false
 * isInvalidValue('') // false
 * isInvalidValue([]) // false
 * isInvalidValue({}) // false
 *
 * @example
 * const isInvalidValue = pickFalsy('number');
 *
 * isInvalidValue(0) // true
 * isInvalidValue(-0) // true
 *
 * @example
 * const isInvalidValue = pickFalsy('string');
 *
 * isInvalidValue('') // true
 *
 * @example
 * const isInvalidValue = pickFalsy('array');
 *
 * isInvalidValue([]) // true
 *
 * @example
 * const isInvalidValue = pickFalsy('object');
 *
 * isInvalidValue({}) // true
 */
export function pickFalsy(
  ...falsyCheckList: FalsyCheckKey[]
): <T>(value: T) => boolean {
  return function (value: unknown) {
    if (isNil(value)) {
      return true;
    }

    if (isNumber(value) && isNaN(value)) {
      return true;
    }

    if (isBoolean(value) && value === false) {
      return true;
    }

    return falsyCheckList.some(
      (falsyProp) => !!FALSY_CHECK_MAPPER[falsyProp](value)
    );
  };
}
