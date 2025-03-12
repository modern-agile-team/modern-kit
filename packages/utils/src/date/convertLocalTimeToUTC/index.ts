/**
 * 로컬 시간 날짜를 UTC 시간으로 변환합니다.
 *
 * @param {Date} date - 변환할 로컬 시간 날짜입니다.
 * @returns {number} UTC 시간(밀리초)입니다.
 *
 * @example
 * const localDate = new Date('2023-10-01 12:00:00');
 * const utcDate = new Date('2023-10-01T12:00:00Z');
 *
 * convertLocalTimeToUTC(localDate) === utcDate.getTime()
 * // true
 */
export function convertLocalTimeToUTC(date: Date): number {
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneMilliseconds = timezoneOffset * 60 * 1000;

  return date.getTime() - timezoneMilliseconds;
}
