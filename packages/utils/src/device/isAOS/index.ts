import { getOS } from '../getOS';

/**
 * @description 현재 장치가 AOS(Android) 장치인지 여부를 확인하는 함수입니다.
 *
 * @returns AOS(Android) 장치라면 `true`, 그렇지 않다면 `false`를 반환합니다.
 *
 * @example
 * if (isAOS()) {
 *   console.log('Android 장치에서 실행 중입니다.');
 * }
 */
export function isAOS() {
  return getOS() === 'android';
}
