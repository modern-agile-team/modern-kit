import { getOS } from '../getOS';

/**
 * @description 현재 장치가 iOS 장치인지 여부를 확인하는 함수입니다.
 *
 * @returns iOS 장치라면 `true`, 그렇지 않다면 `false`를 반환합니다.
 *
 * @example
 * if (isIOS()) {
 *   console.log('iOS 장치에서 실행 중입니다.');
 * }
 */
export function isIOS() {
  return getOS() === 'ios';
}
