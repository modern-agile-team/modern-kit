import { parseDate } from '../parseDate';

type DateEndOfUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'date'
  | 'utcYear'
  | 'utcMonth'
  | 'utcWeek'
  | 'utcDate';

/**
 * @description 주어진 날짜의 특정 단위 끝점을 반환합니다.
 *
 * 로컬 타임존 기준과 UTC 기준 모두 지원하며, 각 단위별로 해당 끝점의 23시 59분 59초를 반환합니다.
 *
 * - `year`: 로컬 타임존 기준 해당 연도의 12월 31일 23시 59분 59초
 * - `month`: 로컬 타임존 기준 해당 월의 마지막 날 23시 59분 59초
 * - `week`: 로컬 타임존 기준 해당 주의 마지막 날(토요일) 23시 59분 59초
 * - `date`: 로컬 타임존 기준 해당 날짜의 23시 59분 59초
 * - `utcYear`: UTC 기준 해당 연도의 12월 31일 23시 59분 59초
 * - `utcMonth`: UTC 기준 해당 월의 마지막 날 23시 59분 59초
 * - `utcWeek`: UTC 기준 해당 주의 마지막 날(토요일) 23시 59분 59초
 * - `utcDate`: UTC 기준 해당 날짜의 23시 59분 59초
 *
 * @param {string | Date | number} date - 기준 날짜
 * @param {DateEndOfUnit} unit - 끝점을 구할 단위
 * @returns {Date} 끝점이 셋팅된 Date 객체
 *
 * @example
 * // 로컬 타임존(KST) 기준
 * const target = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 * const date = getDateEndOf(target, 'year'); // 2025-12-31 23:59:59.999 (수요일)
 *
 * date.toISOString(); // '2025-12-31T14:59:59.999Z', KST 기준
 * date.getFullYear(); // 2025
 * date.getMonth(); // 11
 * date.getDate(); // 31
 * date.getDay(); // 3
 * date.getHours(); // 23
 * date.getMinutes(); // 59
 * date.getSeconds(); // 59
 * date.getMilliseconds(); // 999
 *
 * @example
 * // UTC 타임존 기준
 * const target = '2025-03-15T14:30:45.123Z'
 * // 2025-03-15 23:30:45 (KST 기준 토요일)
 * // 2025-03-15 14:30:45 (UTC 기준 토요일)
 *
 * const utcDate = getDateEndOf(target, 'utcYear'); // 2025-12-31 23:59:59.999 (수요일)
 *
 * utcDate.toISOString(); // '2025-12-31T23:59:59.999Z', UTC 기준
 * utcDate.getUTCFullYear(); // 2025
 * utcDate.getUTCMonth(); // 11
 * utcDate.getUTCDate(); // 31
 * utcDate.getUTCDay(); // 3
 * utcDate.getUTCHours(); // 23
 * utcDate.getUTCMinutes(); // 59
 * utcDate.getUTCSeconds(); // 59
 * utcDate.getUTCMilliseconds(); // 999
 */
export function getDateEndOf(
  date: string | Date | number,
  unit: DateEndOfUnit
): Date {
  const parsedDate = parseDate(date);

  // UTC 단위인지 확인
  const isUTC = unit.startsWith('utc');
  const baseUnit = isUTC ? unit.slice(3).toLowerCase() : unit;

  const year = isUTC ? parsedDate.getUTCFullYear() : parsedDate.getFullYear();
  const month = isUTC ? parsedDate.getUTCMonth() : parsedDate.getMonth();
  const day = isUTC ? parsedDate.getUTCDate() : parsedDate.getDate();

  switch (baseUnit) {
    case 'year':
      if (isUTC) {
        return new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999));
      }
      return new Date(year, 11, 31, 23, 59, 59, 999);
    case 'month': {
      const lastDayOfMonth = isUTC
        ? new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
        : new Date(year, month + 1, 0).getDate();

      if (isUTC) {
        return new Date(Date.UTC(year, month, lastDayOfMonth, 23, 59, 59, 999));
      }
      return new Date(year, month, lastDayOfMonth, 23, 59, 59, 999);
    }
    case 'week': {
      const dayOfWeek = isUTC ? parsedDate.getUTCDay() : parsedDate.getDay();
      const endOfWeek = day + (6 - dayOfWeek);

      if (isUTC) {
        return new Date(Date.UTC(year, month, endOfWeek, 23, 59, 59, 999));
      }
      return new Date(year, month, endOfWeek, 23, 59, 59, 999);
    }
    case 'date':
      if (isUTC) {
        return new Date(Date.UTC(year, month, day, 23, 59, 59, 999));
      }
      return new Date(year, month, day, 23, 59, 59, 999);
    default:
      throw new Error(`지원하지 않는 단위입니다`);
  }
}
