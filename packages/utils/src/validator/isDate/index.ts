/**
 * @description 주어진 값이 `Date` 타입인지 확인합니다.
 *
 * 타입 체크 및 변수의 타입을 `Date`로 좁히는 데 유용합니다.
 *
 * @param {unknown} value - 확인할 값입니다.
 * @returns {value is Date} 값이 `Date` 객체일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const date = new Date();
 * isDate(date); // true
 *
 * const notDate = "2023-01-01";
 * isDate(notDate); // false
 */
export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}
