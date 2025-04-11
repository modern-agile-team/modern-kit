/**
 * @description 로컬 시간을 UTC 시간으로 변환합니다.
 *
 * `YYYY-MM-DD HH:mm:ss`와 같은 로컬 시간은 나라마다 다르게 해석됩니다.
 * - new Date('2025-01-01 09:30:15').getTime(); // 한국(서울): 1735704015000
 * - new Date('2025-01-01 09:30:15').getTime(); // 인도(뉴델리): 1735691415000
 *
 * 어떤 나라에서든 동일한 timestamp를 얻기 위해서는 UTC 시간으로 보정해야 합니다.
 *
 * @param {Date} date - 날짜 객체
 * @returns {number} 어느 나라에서든 동일한 UTC 시간 반환
 *
 * @example
 * // 한국(서울) 기준
 * const kstDate = new Date('2025-01-01 09:30:15');
 * const kstDateTime = kstDate.getTime(); // 1735704015000
 * const utcTime = getUTCTime(kstDate); // 1735723815000
 *
 * // 인도(뉴델리) 기준
 * const indiaDate = new Date('2025-01-01 09:30:15');
 * const indiaTime = indiaDate.getTime(); // 1735691415000
 * const utcTime = getUTCTime(indiaDate); // 1735723815000
 */
export function getUTCTime(date: Date): number {
  const dateTime = date.getTime();
  const offset = date.getTimezoneOffset();
  return dateTime - offset * 60 * 1000;
}
