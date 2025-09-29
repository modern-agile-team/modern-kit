import { isServer } from "../isServer";

/**
 * @description Window 객체를 안전하게 가져옵니다.
 * @returns {Window} window 객체
 * @throws {Error} 서버 환경에서는 window 객체를 가져올 수 없습니다.
 * 
 * @example
 * const window = getSafeWindow();
 * window.addEventListener('click', () => {
 *   console.log('click');
 * });
 */
export function getSafeWindow(): Window {
  if (isServer()) {
    throw new Error('서버 환경에서는 window 객체를 가져올 수 없습니다.');
  }
  return window;
}