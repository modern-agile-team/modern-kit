interface Options {
  sign?: boolean;
}

/**
 * @description 문자열이 숫자만으로 이루어졌는지 확인합니다.
 *
 * @param {string} value - 숫자만으로 이루어졌는지 확인할 문자열.
 * @param {Options} options
 * @property {boolean} sign - "-" 및 "." 기호를 포함 할 것인지 여부를 포함한 옵션입니다.
 * @returns {boolean} - 문자열이 숫자만으로 이루어졌다면 `true`, 그렇지 않다면 `false`를 반환합니다.
 *
 * @example
 * isNumericString("12345"); // true
 *
 * isNumericString("123a45"); // false
 * isNumericString(""); // false
 *
 * @example
 * isNumericString("123.45", { sign: true }); // true
 * isNumericString("-123", { sign: true }); // true
 *
 * isNumericString('12-345', { sign: true }); // false, ("-" 기호는 문자열 가장 앞에만 붙일 수 있음)
 * isNumericString("1245.", { sign: true }); // false, (소수점 뒤에 숫자가 없음)
 */
export function isNumericString(value: string, options: Options = {}): boolean {
  const { sign = false } = options;
  const regex = sign ? /^-?[0-9]+(\.[0-9]+)?$/ : /^[0-9]+$/;

  return regex.test(value);
}
