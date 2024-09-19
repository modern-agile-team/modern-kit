import { isServer } from '../../device/isServer';

/**
 * @description 현재 장치가 모바일 장치인지 여부를 확인하는 함수입니다.
 *
 * `isMobile` 함수는 브라우저의 `userAgent` 문자열을 사용하여 현재 사용자가
 * 모바일 장치를 사용 중인지 판별합니다. 만약 서버 환경에서 호출될 경우, 항상 `false`를 반환합니다.
 *
 * @returns {boolean} - 모바일 장치라면 `true`, 그렇지 않다면 `false`를 반환합니다.
 *
 * @example
 * if (isMobile()) {
 *   console.log('모바일 장치입니다.');
 * } else {
 *   console.log('모바일 장치가 아닙니다.');
 * }
 */
export function isMobile(): boolean {
  if (isServer()) return false;

  const userAgent = window.navigator.userAgent;
  const regex =
    /Android|webOS|iPhone|iPad|iPod|Windows Phone|BlackBerry|IEMobile|Opera Mini/i;

  return regex.test(userAgent);
}
