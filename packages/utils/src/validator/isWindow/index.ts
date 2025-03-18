/**
 * @description 주어진 요소가 `window` 객체인지 확인합니다.
 *
 * @param {unknown} element 확인할 요소
 * @returns {boolean} 요소가 `window` 객체인 경우 `true`, 그렇지 않은 경우 `false`를 반환합니다.
 *
 * @example
 * isWindow(window); // true
 *
 * @example
 * isWindow(document); // false
 * isWindow({}); // false
 * isWindow(""); // false
 * isWindow(0); // false
 */
export function isWindow(element: unknown): element is Window {
  if (typeof window === 'undefined') {
    return false;
  }

  return element === window;
}
