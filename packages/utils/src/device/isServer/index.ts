/**
 * @description 서버 환경에서 실행 중인지 여부를 확인하는 함수입니다.
 *
 * 이 함수는 클라이언트와 서버 간의 실행 환경을 구분하는 데 사용됩니다.
 * 만약 `window` 객체가 정의되어 있지 않다면, 서버 환경에서 실행 중인 것으로 간주됩니다.
 *
 * @returns {boolean} 서버 환경에서 실행 중이면 `true`, 클라이언트 환경에서 실행 중이면 `false`를 반환합니다.
 *
 * @example
 * if (isServer()) {
 *   // 서버에서 실행 중입니다.
 * } else {
 *   // 클라이언트에서 실행 중입니다.
 * }
 */
export function isServer(): boolean {
  return typeof window === 'undefined';
}
