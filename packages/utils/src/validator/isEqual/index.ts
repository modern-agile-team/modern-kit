import { isEqualInternal } from './isEqual.utils';

/**
 * @description 주어진 두 값이 동일한지 여부를 판단합니다. `원시 값`, `객체`, `배열`, `Set`, `Map` 및 `함수`에 대해 정확한 비교를 수행합니다.
 *
 * @param {any} source - 비교할 첫 번째 값입니다.
 * @param {any} target - 비교할 두 번째 값입니다.
 * @returns {boolean} - 두 값이 동일하면 true, 그렇지 않으면 false를 반환합니다.
 *
 * @example
 * isEqual({ a: 1 }, { a: 1 }); // true
 * isEqual({ a: 1 }, { b: 1 }); // false
 */
export function isEqual(source: any, target: any): boolean {
  const visited = new WeakMap();

  return isEqualInternal(source, target, visited);
}
