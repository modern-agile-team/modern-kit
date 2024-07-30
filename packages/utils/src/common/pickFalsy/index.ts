import { FALSY_MAPPER } from './internal';

type FalsyMapperKeys = keyof typeof FALSY_MAPPER;
type PickFalsyProps = Exclude<
  FalsyMapperKeys,
  'null' | 'undefined' | 'boolean'
>;

/**
 * @description 선택한 타입에 대한 falsy 체크 함수를 반환합니다.
 *
 * 필요하다면 `숫자 0`, `빈 문자열("")`, `빈 객체({})`, `빈 배열([])`에 대해 판단할 수 있습니다.
 *
 * 인자가 없다면, 기본적으로 `boolean`, `null`, `undefined`에 대해서만 falsy 값 체크를 수행합니다.
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
