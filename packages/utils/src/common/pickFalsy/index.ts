import {
  type FalsyMapperKeys,
  type PickFalsyProps,
  FALSY_MAPPER,
} from './internal';

/**
 * @description 선택한 타입에 대한 falsy 체크함수를 반환합니다.
 *
 * 인자가 없더라도 기본적으로 null, undefined에 대한 체크를 수행합니다.
 *
 * @param arr - falsy를 체크하고자 하는 타입을 받습니다.
 * @returns - 선택한 타입에 대한 falsy함수를 반환합니다. falsy를 체크하는 함수이기때문에 해당 함수로부터의 반환값이 true라면 falsy, false라면 truthy입니다.
 *
 * @example
 * const isInvalidValue = pickFalsy()
 *
 * isInvalidValue(null) // true
 * isInvalidValue(undeinfed) // true
 * isInvalidValue(false) // true
 * isInvalidValue(0) // false
 * isInvalidValue('') // false
 * isInvalidValue([]) // false
 * isInvalidValue({}) // false
 *
 * const isInvalidValue = pickFalsy('number', 'string', 'array', 'object')
 *
 * isInvalidValue(null) // true
 * isInvalidValue(undeinfed) // true
 * isInvalidValue(false) // true
 * isInvalidValue(0) // true
 * isInvalidValue('') // true
 * isInvalidValue([]) // true
 * isInvalidValue({}) // true
 */

export function pickFalsy(...arr: PickFalsyProps[]) {
  const defaultCheckList = ['null', 'undefined', 'boolean'];
  return function (value: unknown) {
    const falsyCheckList = [...defaultCheckList, ...arr] as FalsyMapperKeys[];

    return falsyCheckList.some((falsyProp) => !!FALSY_MAPPER[falsyProp](value));
  };
}
