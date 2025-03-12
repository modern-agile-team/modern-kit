/**
 * @description 주어진 인자가 `RegExp` 인지 검사하고, 맞다면 인자의 타입을 `RegExp`로 좁혀주는 함수입니다.
 *
 * @param {unknown} value - 확인할 값입니다.
 * @returns {value is RegExp} 값이 `RegExp` 인스턴스일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isRegExp(/abc/); // true
 * isRegExp(new RegExp('abc')); // true
 *
 * isRegExp('abc'); // false
 * isRegExp(123); // false
 * isRegExp({}); // false
 * isRegExp([]); // false
 */
export function isRegExp(value: unknown): value is RegExp {
  return value instanceof RegExp;
}
