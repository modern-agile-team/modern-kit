/**
 * @description 50% 확률로 `0`또는 `1`을 반환하는 함수입니다.
 * @returns {0 | 1} 0 또는 1
 */
export function abRandom(): 0 | 1 {
  return Math.random() < 0.5 ? 0 : 1;
}
