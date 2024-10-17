import { getUniqTime } from '../getUniqTime';

/**
 * @description 주어진 접두사와 함께 고유한 ID를 생성합니다.
 *
 * 이 함수는 밀리초 단위의 현재 시간과 내부 카운터를 결합하여,
 * 동일한 밀리초 내에서 함수가 여러 번 호출되더라도 고유성을 보장합니다.
 * 결과는 16진수 문자열로 변환되며, 선택적으로 사용자 정의 prefix를 붙일 수 있습니다.
 *
 * @param {string} [prefix=''] - 고유한 ID 앞에 붙일 선택적인 접두사.
 * @returns {string} 접두사가 붙은 고유한 16진수 문자열 ID.
 *
 * @example
 * // 동일한 밀리초 내에 호출되었을 경우
 * const id1 = getUniqueId(); // 60dde9b51e400
 * const id2 = getUniqueId(); // 60dde9b51e401
 *
 * @example
 * const uniqueId = getUniqueId('user_');
 * // 'user_624a5ed871668'
 */
export function getUniqId(prefix: string = ''): string {
  return prefix + (getUniqTime() * 1000).toString(16);
}
